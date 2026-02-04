---
title: "Crackmes: EasyVM (Medium)"
description: "Reverse engineering a custom Virtual Machine interpreter to find a valid 10-character licence key using static and dynamic analysis"
pubDatetime: 2026-02-03T00:00:00Z
tags: ["reverse-engineering", "crackmes", "vm", "ctf"]
draft: false
---

# Crackmes : EasyVM (Medium)
* Author : CorpCons
* Difficulty: 3.2 Rate!
* Quality: 4.7 Rate!
* Download : https://crackmes.one/crackme/69723bb7d735cd51e7a1aa78
## Key takeaways
* **Knowledge :** Custom VM Architecture, Anti-static analyst.
* **Technique :** Static Analysis, Dynamic Analyst, Stack Construction, Data Structure & Algorithm.
* **Programming language** : C/C++.
## Case Summary
The objective of this challenge is to find the key via opcode and understand how the data run in the program. It is necessery to reverse engineer the custom Virtual Machine interpreter to find a valid 10-character licence key. The algorithm obfuscated using a custom instruction set and dynamic bytecode generation. 
## Analyst
### Static Analyst

![1.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/EasyVM/1.png)
Firstly, let's execute this binary on safety. The program requires 10-characters License Key so it is unnecessery to think about what string should have been an input.

Upon entering whatever random string, the program outputs "This license key is corrupted." and loop back to the input prompt.

![2.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/EasyVM/2.png)

An analyst of the loop shows a lot of commands and bytes here, and they are all stored in `fking_opcode` arrays after all.

![3.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/EasyVM/3.png)

Next, The code invokes the `VM_INTERPRETER` function with two parameters, first one is the 8th of the input_string and the opcode array.

![4.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/EasyVM/4.png)

Certain characters have been identified as components of OPCODE structure within the machine language, defined as `<opcode> <operand>, <mode>`(e.g.,`mov eax, 4.`).

Given the custom VM architecture, the code functions similarly to Assembly language. For example, the 'A' opcode triggers an addition operation, adding the current result to another operand.

These characters correspond to specific instructions, as defined below: : 

```
A : ADD
S : SUBTRACT
X : XOR
O : OUTPUT (STORAGE)
I : INITIALIZE
```

![5.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/EasyVM/5.png)

Ultimately, the return value is stored in `KEY_LICENSE`. A result of zero indicates that the correct key has been entered.

### Dynamic Analyst


![6.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/EasyVM/6.png)

The VM_INTERPRETER is putted breakpoint in order to get the opcode parameter. It is not hard to realize that some characters of input string will be there.

| Input Character | Position (Index) | Corresponding VM Instruction                                  |
|-----------------|------------------|----------------------------------------------------------------|
| Character 1     | 1                | I (Load)                                                       |
| Character 2     | 7                | I (Load)                                                       |
| Character 3     | 49               | I (Load)                                                       |
| Character 4     | 55               | I (Load)                                                       |
| Character 5     | 97               | I (Load)                                                       |
| Character 6     | 103              | I (Load)                                                       |
| Character 7     | 145              | I (Load) - Note: Character 7 is very far behind               |
| Character 8     | 112              | A (Add) - This is the place you are looking for!              |
| Character 8     | 151              | I (Load again at the end)                                     |

Finally, it is important to find what the characters should be, so the data is analyzed to obtain the key.
Formula : `<opcode> <operand>, <mode>`
**PART 1: PROCESSING THE FIRST INPUT PAIR (Input 0, 1)**

`x = (input[0] - 75) + (input[1] - 69)`

| Index | Instruction (Bytecode)   | Logical Meaning                                      |
| ----- | ------------------------ | ---------------------------------------------------- |
| 0     | I \|input\|0             | result = input (Load character 1)                    |
| 3     | O \|1\|A                 | tmp​ = result                           |
| 6     | I \|input​\|0 | result = input​ (Load character 2)      |
| 9     | O \|2\|A                 | tmp​ = result                           |
| 12    | I \|1\|A                 | result = tmp​ (Get input)               |
| 15    | S \|'K'\|0               | result -= 'K' (75)                                   |
| 18    | O \|8\|A                 | tmp​ = result                                  |
| 21    | I \|2\|A                 | result = tmp​  |
| 24    | S \|'E'\|0               | result -= 'E' (69)                                   |
| 27    | O \|9\|A                 | tmp​ = result                               |
| 30    | I \|8\|A                 | result = tmp​                                  |
| 33    | A \|9\|A                 | result += tmp​                              |
| 36    | O \|10\|A                | tmp​ = result (Total variable)              |

**PART 2: PROCESSING THE NEXT INPUT PAIR (Input 2, 3)**

`x += (input[2] - 89) + (input[3] - 45)`

| Index | Instruction (Bytecode)   | Logical Meaning                                      |
| ----- | ------------------------ | ---------------------------------------------------- |
| 48    | I \|input​\|0 | result = input​ (Load character 3)      |
| 51    | O \|1\|A                 | tmp​ = result                           |
| 54    | I \|input​\|0 | result = input​ (Load character 4)      |
| 57    | O \|2\|A                 | tmp​ = result                           |
| 60    | I \|1\|A                 | result = tmp​ (Get input​) |
| 63    | S \|'Y'\|0               | result -= 'Y' (89)                                   |
| 66    | O \|8\|A                 | tmp​ = result                                  |
| 69    | I \|2\|A                 | result = tmp​ (Get input​) |
| 72    | S \|'-'\|0               | result -= '-' (45)                                   |
| 75    | O \|9\|A                 | tmp​ = result                               |
| 78    | I \|8\|A                 | result = tmp​                                  |
| 81    | A \|9\|A                 | result += tmp​                              |
| 84    | A \|10\|A                | result += tmp​    |
| 87    | O \|10\|A                | tmp​ = result                               |

**PART 3: PROCESSING THE COMPLEX INPUT GROUP (Input 4, 5, 7)**
`x += input[4] + input[7] - 75 - input[5]`

| Index | Instruction (Bytecode)     | Logical Meaning                                         |
| ----- | -------------------------- | ------------------------------------------------------- |
| 96    | I \|input​\|0 | result = input​ (Load character 5)       |
| 99    | O \|1\|A                   | tmp​ = result                              |
| 102   | I \|input​\|0    | result = input​ (Load character 6)            |
| 105   | O \|2\|A                   | tmp​ = result                              |
| 108   | I \|1\|A                   | result = tmp​ (Get input​)  |
| 111   | A \|input​\|0       | result += input​ (Add character 8)      |
| 114   | S \|'K'\|0                 | result -= 'K' (75)                                      |
| 117   | S \|2\|A                   | result -= tmp​ |
| 120   | A \|10\|A                  | result += tmp​                                 |
| 123   | O \|10\|A                  | tmp​ = result                                  |

**PART 4: PROCESSING THE LAST INPUT PAIR (Input 6, 7)**
`x += input[6] - input[7]`

| Index | Instruction (Bytecode) | Logical Meaning                                      |
| ----- | ---------------------- | ---------------------------------------------------- |
| 144   | I \|input​\|0          | result = input​ (Load character 7)                   |
| 147   | O \|1\|A               | tmp[1] = result                           |
| 150   | I \|input​\|0   | result = input[7]​ (Reload character 8)          |
| 153   | O \|2\|A               | tmp[2] = result                           |
| 156   | I \|1\|A               | result = tmp[1]              |
| 159   | S \|2\|A               | result -= tmp[2]​ (Subtract​) |
| 162   | A \|10\|A              | result += tmp[10]​                              |
| 165   | O \|10\|A              | tmp[10] = result                             |

Final overall expression
```
x = (input[0] - 75) + (input[1] - 69)
  + (input[2] - 89) + (input[3] - 45)
  + input[4] + input[7] - 75 - input[5]
  + input[6] - input[7]
  = 0
```

Lastly, the license key consists of 'KEY-KAA' plus any number of trailing characters.

For some instances : 
KEY-KAAKATJRI
KEY-KAAKAT123
KEY-KAAVIETNAMESE
KEY-KAA_HOANGSA_TRUONGSA_BELONG_TO_VIETNAM
![7.png](https://raw.githubusercontent.com/KajriVN/Blog/main/src/assets/images/EasyVM/7.png)


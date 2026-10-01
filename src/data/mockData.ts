import { ChapterNote, MCQQuestion, PDFProduct, SyllabusUnit } from '../types';

export const SYLLABUS_DATA: SyllabusUnit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Computer Systems and Organization',
    titleHindi: 'कंप्यूटर सिस्टम और संगठन',
    expectedQuestions: 8,
    category: 'Class XI-XII',
    weightagePercent: 10,
    subtopics: [
      { id: '1-1', title: 'Basic Computer Organization', titleHindi: 'कंप्यूटर संगठन', description: 'Von Neumann architecture, CPU, ALU, Control Unit, Registers, Memory hierarchy', isImportant: true },
      { id: '1-2', title: 'Memory Units & Storage Devices', titleHindi: 'मेमोरी इकाइयाँ और स्टोरेज', description: 'RAM, ROM, Cache Memory (L1, L2, L3), Secondary storage, Hit ratio calculation', isImportant: true },
      { id: '1-3', title: 'Number Systems & Conversions', titleHindi: 'संख्या प्रणाली', description: 'Binary, Octal, Decimal, Hexadecimal, 1\'s and 2\'s complement arithmetic, Floating point IEEE 754', isImportant: true },
      { id: '1-4', title: 'Boolean Logic & Logic Gates', titleHindi: 'बूलियन लॉजिक और गेट्स', description: 'AND, OR, NOT, NAND, NOR, XOR, XNOR, De Morgan\'s Laws, K-Map simplification, SOP/POS forms', isImportant: true },
    ]
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Computational Thinking and Programming (Python & C++)',
    titleHindi: 'प्रोग्रामिंग और कम्प्यूटेशनल थिंकिंग',
    expectedQuestions: 14,
    category: 'Class XI-XII',
    weightagePercent: 18,
    subtopics: [
      { id: '2-1', title: 'Programming Fundamentals', titleHindi: 'प्रोग्रामिंग मूल सिद्धांत', description: 'Tokens, Identifiers, Keywords, Data types, Operators, Type casting, Precedence', isImportant: true },
      { id: '2-2', title: 'Control Flow & Loops', titleHindi: 'कंट्रोल फ्लो और लूप्स', description: 'if-elif-else, while, for loops, break, continue, pass statements', isImportant: false },
      { id: '2-3', title: 'Strings, Lists, Tuples, Dictionaries', titleHindi: 'डेटा टाइप्स और ऑपरेशन्स', description: 'Indexing, Slicing, List comprehension, Mutability vs Immutability, Dictionary hashing', isImportant: true },
      { id: '2-4', title: 'Functions, Scope & Recursion', titleHindi: 'फंक्शंस, स्कोप और रिकर्शन', description: 'LEGB rule, default arguments, *args, **kwargs, Recursive call stack analysis', isImportant: true },
      { id: '2-5', title: 'Object-Oriented Programming (OOPs)', titleHindi: 'ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग', description: 'Encapsulation, Inheritance types, Polymorphism, Overloading, Overriding, Abstract classes', isImportant: true },
    ]
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Data Structures and Algorithms',
    titleHindi: 'डेटा स्ट्रक्चर और एल्गोरिदम',
    expectedQuestions: 12,
    category: 'Core CS',
    weightagePercent: 15,
    subtopics: [
      { id: '3-1', title: 'Time and Space Complexity Analysis', titleHindi: 'जटिलता विश्लेषण', description: 'Big-O, Big-Omega, Theta notations, Best/Worst/Average case scenarios', isImportant: true },
      { id: '3-2', title: 'Linear Data Structures', titleHindi: 'रैखिक डेटा संरचनाएँ', description: 'Arrays, Singly/Doubly/Circular Linked Lists, Pointer manipulation', isImportant: true },
      { id: '3-3', title: 'Stacks & Queues Applications', titleHindi: 'स्टैक और कतार', description: 'Infix to Postfix/Prefix conversion, Postfix evaluation, Circular Queue, Priority Queue', isImportant: true },
      { id: '3-4', title: 'Trees & Binary Search Trees (BST)', titleHindi: 'ट्री और बाइनरी सर्च ट्री', description: 'Inorder, Preorder, Postorder traversals, Height, Balanced BST (AVL basics), Heap tree', isImportant: true },
      { id: '3-5', title: 'Sorting & Searching Algorithms', titleHindi: 'सॉर्टिंग और सर्चिंग', description: 'Bubble, Insertion, Selection, Merge, Quick Sort (Pivoting, Complexity comparisons)', isImportant: true },
    ]
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Database Management Systems (DBMS) & SQL',
    titleHindi: 'डेटाबेस प्रबंधन प्रणाली और SQL',
    expectedQuestions: 12,
    category: 'Core CS',
    weightagePercent: 15,
    subtopics: [
      { id: '4-1', title: 'Database Concepts & Architecture', titleHindi: 'डेटाबेस वास्तुकला', description: '3-Schema Architecture, Data Independence (Physical & Logical), DBA responsibilities', isImportant: false },
      { id: '4-2', title: 'Entity-Relationship (ER) Modeling', titleHindi: 'ई-आर मॉडलिंग', description: 'Entities, Attributes (Atomic, Composite, Multivalued, Derived), Cardinality, Weak entity sets', isImportant: true },
      { id: '4-3', title: 'Relational Model & Normalization', titleHindi: 'संबंधपरक मॉडल और सामान्यीकरण', description: 'Candidate Key, Super Key, Primary/Foreign Key, 1NF, 2NF, 3NF, BCNF anomalies', isImportant: true },
      { id: '4-4', title: 'Structured Query Language (SQL)', titleHindi: 'एसक्यूएल (SQL)', description: 'DDL, DML, DCL, TCL, Aggregate functions, GROUP BY, HAVING, Nested Subqueries, INNER/LEFT/RIGHT Joins', isImportant: true },
      { id: '4-5', title: 'Transactions & Concurrency Control', titleHindi: 'ट्रांजैक्शन और समवर्ती नियंत्रण', description: 'ACID properties, Serializability, 2-Phase Locking (2PL), Deadlock handling', isImportant: true },
    ]
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Computer Networks and Data Communication',
    titleHindi: 'कंप्यूटर नेटवर्क और डेटा संचार',
    expectedQuestions: 10,
    category: 'Systems',
    weightagePercent: 12,
    subtopics: [
      { id: '5-1', title: 'Network Topologies & Transmission Media', titleHindi: 'नेटवर्क टोपोलॉजी और माध्यम', description: 'Star, Bus, Ring, Mesh, Guided (Twisted, Coaxial, Optical Fiber) vs Unguided', isImportant: false },
      { id: '5-2', title: 'OSI Reference Model vs TCP/IP Suite', titleHindi: 'OSI और TCP/IP मॉडल', description: '7 Layers of OSI, Encapsulation, PDU at each layer, Protocol mapping', isImportant: true },
      { id: '5-3', title: 'Network Layer & IP Addressing', titleHindi: 'आईपी एड्रेसिंग और सबनेटिंग', description: 'IPv4 Classful vs Classless (CIDR), Subnet Mask calculations, IPv6 format', isImportant: true },
      { id: '5-4', title: 'Transport & Application Layer Protocols', titleHindi: 'प्रोटोकॉल्स', description: 'TCP 3-way handshake vs UDP, Port numbers, DNS, HTTP/HTTPS, FTP, SMTP, DHCP, ARP', isImportant: true },
      { id: '5-5', title: 'Network Devices & Switching', titleHindi: 'नेटवर्क उपकरण', description: 'Repeater, Hub, Switch, Bridge, Router, Gateway, Circuit vs Packet Switching', isImportant: true },
    ]
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    title: 'Operating Systems & System Software',
    titleHindi: 'ऑपरेटिंग सिस्टम और सिस्टम सॉफ्टवेयर',
    expectedQuestions: 10,
    category: 'Systems',
    weightagePercent: 12,
    subtopics: [
      { id: '6-1', title: 'OS Concepts & Process Management', titleHindi: 'प्रोसेस प्रबंधन', description: 'Process States, PCB, Context Switching, Preemptive vs Non-preemptive scheduling', isImportant: true },
      { id: '6-2', title: 'CPU Scheduling Algorithms', titleHindi: 'सीपीयू शेड्यूलिंग', description: 'FCFS, SJF, SRTF, Round Robin (Quantum calculation), Priority scheduling, Gantt Charts', isImportant: true },
      { id: '6-3', title: 'Process Synchronization & Deadlocks', titleHindi: 'सिंक्रनाइज़ेशन और डेडलॉक', description: 'Critical Section, Mutex, Semaphores, 4 Deadlock Conditions, Banker\'s Algorithm', isImportant: true },
      { id: '6-4', title: 'Memory Management & Virtual Memory', titleHindi: 'मेमोरी प्रबंधन', description: 'Paging, Segmentation, TLB, Page Faults, FIFO, LRU, Optimal Page Replacement', isImportant: true },
    ]
  },
  {
    id: 'unit-7',
    unitNumber: 7,
    title: 'Software Engineering & Web Technologies',
    titleHindi: 'सॉफ्टवेयर इंजीनियरिंग और वेब टेक्नोलॉजीज',
    expectedQuestions: 8,
    category: 'Software & Web',
    weightagePercent: 10,
    subtopics: [
      { id: '7-1', title: 'Software Development Life Cycle (SDLC)', titleHindi: 'एसडीएलसी मॉडल', description: 'Waterfall, Spiral, Agile Scrum, V-Model, Prototyping', isImportant: true },
      { id: '7-2', title: 'Software Testing & Quality Metrics', titleHindi: 'सॉफ्टवेयर टेस्टिंग', description: 'Black-box vs White-box testing, Unit/Integration/System testing, Cyclomatic Complexity', isImportant: true },
      { id: '7-3', title: 'Web Technologies (HTML, CSS, JS)', titleHindi: 'वेब टेक्नोलॉजीज', description: 'HTML5 semantic tags, CSS Box Model, JavaScript DOM manipulation, XML, JSON', isImportant: true },
    ]
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    title: 'Cyber Security, Digital Society & Emerging Trends',
    titleHindi: 'साइबर सुरक्षा और उभरते रुझान',
    expectedQuestions: 6,
    category: 'Emerging',
    weightagePercent: 8,
    subtopics: [
      { id: '8-1', title: 'Cyber Threats & Malware', titleHindi: 'साइबर खतरे', description: 'Virus, Worm, Trojan Horse, Ransomware, Phishing, Denial of Service (DoS/DDoS)', isImportant: true },
      { id: '8-2', title: 'Cryptography & Security Measures', titleHindi: 'क्रिप्टोग्राफी और सुरक्षा', description: 'Symmetric (AES, DES) vs Asymmetric (RSA), Digital Signatures, Firewalls, SSL/TLS', isImportant: true },
      { id: '8-3', title: 'Cyber Laws & Ethics', titleHindi: 'साइबर कानून (IT Act)', description: 'Information Technology Act 2000 & 2008 amendments, Intellectual Property Rights (IPR), GPL/Open Source', isImportant: true },
      { id: '8-4', title: 'Emerging Trends in Tech', titleHindi: 'आर्टिफिशियल इंटेलिजेंस और उभरती तकनीकें', description: 'Artificial Intelligence, Machine Learning basics, Cloud Computing (IaaS, PaaS, SaaS), IoT, Big Data', isImportant: false },
    ]
  }
];

export const MOCK_MCQS: MCQQuestion[] = [
  {
    id: 'mcq-1',
    topicId: 'unit-1',
    topicName: 'Number System & Boolean Logic',
    question: 'What is the 2\'s complement representation of the decimal number -19 in an 8-bit register?',
    questionHindi: '8-बिट रजिस्टर में दशमलव संख्या -19 का 2\'s पूरक (2\'s Complement) क्या होगा?',
    options: ['11101101', '11101100', '11101011', '00010011'],
    optionsHindi: ['11101101', '11101100', '11101011', '00010011'],
    correctIndex: 0,
    explanation: 'Step 1: +19 in 8-bit binary is 00010011. Step 2: 1\'s complement is 11101100. Step 3: Add 1 for 2\'s complement -> 11101101.',
    explanationHindi: '+19 का बाइनरी = 00010011. 1\'s complement = 11101100. 1 जोड़ने पर 2\'s complement = 11101101 प्राप्त होता है।',
    difficulty: 'Medium',
    pyqReference: 'BPSC TRE 2.0 (2023)'
  },
  {
    id: 'mcq-2',
    topicId: 'unit-4',
    topicName: 'DBMS & Normalization',
    question: 'A relational table is said to be in 3NF if it is in 2NF and has no:',
    questionHindi: 'एक रिलेशनल टेबल 3NF में कही जाती है यदि वह 2NF में है और उसमें नहीं है:',
    options: [
      'Transitive dependency of non-prime attribute on primary key',
      'Partial dependency',
      'Multivalued dependency',
      'Join dependency'
    ],
    optionsHindi: [
      'प्राइमरी की पर गैर-प्राइम एट्रिब्यूट की सकर्मक निर्भरता (Transitive Dependency)',
      'आंशिक निर्भरता (Partial Dependency)',
      'बहुमूल्य निर्भरता (Multivalued Dependency)',
      'जॉइन निर्भरता (Join Dependency)'
    ],
    correctIndex: 0,
    explanation: '2NF eliminates partial dependency (where non-prime depends on part of candidate key). 3NF eliminates transitive dependencies (X -> Y and Y -> Z where Z is non-prime).',
    explanationHindi: '2NF आंशिक निर्भरता को दूर करता है, जबकि 3NF सकर्मक निर्भरता (Transitive Dependency) को पूरी तरह समाप्त करता है।',
    difficulty: 'Easy',
    pyqReference: 'BPSC TRE 1.0 (2023)'
  },
  {
    id: 'mcq-3',
    topicId: 'unit-3',
    topicName: 'Data Structures',
    question: 'The prefix equivalent of the postfix expression "A B + C D - *" is:',
    questionHindi: 'पोस्टफिक्स अभिव्यक्ति "A B + C D - *" का प्रीफिक्स समतुल्य क्या होगा?',
    options: ['* + A B - C D', '* + A B D C -', '+ * A B - C D', '- * + A B C D'],
    optionsHindi: ['* + A B - C D', '* + A B D C -', '+ * A B - C D', '- * + A B C D'],
    correctIndex: 0,
    explanation: 'Evaluation: (A B +) becomes (+ A B). (C D -) becomes (- C D). Applying * yields * (+ A B) (- C D) = * + A B - C D.',
    explanationHindi: '(A B +) = (+ A B) और (C D -) = (- C D)। ऑपरेटर * को आगे लाने पर: * + A B - C D।',
    difficulty: 'Medium',
    pyqReference: 'BPSC TRE 2.0 (2023)'
  },
  {
    id: 'mcq-4',
    topicId: 'unit-5',
    topicName: 'Computer Networks',
    question: 'Which protocol operates at the Application Layer and is used for securely transmitting encrypted web pages?',
    questionHindi: 'कौन सा प्रोटोकॉल एप्लिकेशन लेयर पर काम करता है और एन्क्रिप्टेड वेब पेजों को सुरक्षित रूप से प्रसारित करने के लिए उपयोग किया जाता है?',
    options: ['HTTPS (Port 443)', 'HTTP (Port 80)', 'FTPS (Port 21)', 'SNMP (Port 161)'],
    optionsHindi: ['HTTPS (पोर्ट 443)', 'HTTP (पोर्ट 80)', 'FTPS (पोर्ट 21)', 'SNMP (पोर्ट 161)'],
    correctIndex: 0,
    explanation: 'HTTPS operates over SSL/TLS on default port 443, securing HTTP communications at the Application Layer.',
    explanationHindi: 'HTTPS पोर्ट 443 पर SSL/TLS के साथ कार्य करता है तथा सुरक्षित डेटा संचार सुनिश्चित करता है।',
    difficulty: 'Easy',
    pyqReference: 'BPSC TRE 3.0 (2024)'
  },
  {
    id: 'mcq-5',
    topicId: 'unit-6',
    topicName: 'Operating Systems',
    question: 'Which of the following conditions is NOT one of Coffman\'s four necessary conditions for Deadlock?',
    questionHindi: 'निम्नलिखित में से कौन सी स्थिति डेडलॉक के लिए कॉफ़मैन की चार आवश्यक शर्तों में से एक नहीं है?',
    options: ['Preemption allowed', 'Mutual Exclusion', 'Hold and Wait', 'Circular Wait'],
    optionsHindi: ['प्रीएम्पशन की अनुमति होना (Preemption allowed)', 'आपसी अपवर्जन (Mutual Exclusion)', 'होल्ड एंड वेट (Hold and Wait)', 'सर्कुलर वेट (Circular Wait)'],
    correctIndex: 0,
    explanation: 'The four necessary conditions for Deadlock are Mutual Exclusion, Hold and Wait, NO Preemption, and Circular Wait. If preemption is allowed, deadlock cannot occur.',
    explanationHindi: 'डेडलॉक की 4 शर्तें हैं: Mutual Exclusion, Hold & Wait, NO Preemption (प्रीएम्पशन न होना), और Circular Wait। अतः "Preemption allowed" शर्त नहीं है।',
    difficulty: 'Medium',
    pyqReference: 'BPSC TRE 2.0 (2023)'
  },
  {
    id: 'mcq-6',
    topicId: 'unit-2',
    topicName: 'Python Programming',
    question: 'What is the output of the following Python snippet?\n`a = [1, 2, 3]`\n`b = a`\n`b.append(4)`\n`print(len(a))`',
    questionHindi: 'निम्नलिखित पाइथन कोड का आउटपुट क्या होगा?\n`a = [1, 2, 3]`\n`b = a`\n`b.append(4)`\n`print(len(a))`',
    options: ['4', '3', 'Error', '[1, 2, 3, 4]'],
    optionsHindi: ['4', '3', 'त्रुटि (Error)', '[1, 2, 3, 4]'],
    correctIndex: 0,
    explanation: 'In Python, variables are references to objects. "b = a" makes b refer to the same list object in memory as a. Appending to b modifies the same list, so len(a) is 4.',
    explanationHindi: 'पाइथन में लिस्ट म्यूटेबल (mutable) ऑब्जेक्ट होती है। `b = a` एक ही ऑब्जेक्ट का संदर्भ देता है। `b.append(4)` करने पर `a` की लंबाई भी 4 हो जाती है।',
    difficulty: 'Easy',
    pyqReference: 'BPSC TRE 1.0 (2023)'
  },
  {
    id: 'mcq-7',
    topicId: 'unit-1',
    topicName: 'Boolean Algebra',
    question: 'According to De Morgan\'s Theorem, the complement of (A + B) is equal to:',
    questionHindi: 'डी मॉर्गन प्रमेय के अनुसार, (A + B) का पूरक (Complement) किसके बराबर है?',
    options: ['A\' · B\'', 'A\' + B\'', 'A · B', '(A · B)\''],
    optionsHindi: ['A\' · B\'', 'A\' + B\'', 'A · B', '(A · B)\''],
    correctIndex: 0,
    explanation: 'De Morgan\'s first theorem states: (A + B)\' = A\' · B\'. (Break the line, change the sign).',
    explanationHindi: 'डी मॉर्गन का पहला नियम: (A + B)\' = A\' · B\' होता है।',
    difficulty: 'Easy',
    pyqReference: 'BPSC TRE 2.0 (2023)'
  },
  {
    id: 'mcq-8',
    topicId: 'unit-4',
    topicName: 'SQL & Queries',
    question: 'Which SQL clause is used to filter records based on the result of an aggregate function (e.g. COUNT, AVG)?',
    questionHindi: 'एग्रीगेट फ़ंक्शन (जैसे COUNT, AVG) के परिणाम के आधार पर रिकॉर्ड को फ़िल्टर करने के लिए किस SQL क्लॉज का उपयोग किया जाता है?',
    options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'],
    optionsHindi: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'],
    correctIndex: 0,
    explanation: 'WHERE filters rows before aggregation. HAVING filters groups after aggregation (with functions like COUNT, SUM, AVG).',
    explanationHindi: 'HAVING क्लॉज का उपयोग एग्रीगेट फ़ंक्शन के बाद समूहों (groups) पर कंडीशन लगाने के लिए किया जाता है। WHERE का उपयोग एग्रीगेट फ़ंक्शन पर सीधे नहीं हो सकता।',
    difficulty: 'Medium',
    pyqReference: 'BPSC TRE 3.0 (2024)'
  },
  {
    id: 'mcq-9',
    topicId: 'unit-3',
    topicName: 'Algorithms & Complexity',
    question: 'What is the worst-case time complexity of Quick Sort algorithm when the pivot chosen is always the extreme element in an already sorted array?',
    questionHindi: 'क्विक सॉर्ट एल्गोरिथ्म की सबसे खराब समय जटिलता (Worst-case Time Complexity) क्या होगी जब चुना गया पिवट पहले से सॉर्ट किए गए ऐरे का चरम तत्व हो?',
    options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
    optionsHindi: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
    correctIndex: 0,
    explanation: 'When the partition is unbalanced (e.g., sorted array with first or last element as pivot), Quick Sort degenerates into O(n²). The average case is O(n log n).',
    explanationHindi: 'पहले से सॉर्ट किए गए ऐरे में यदि पहला या अंतिम तत्व पिवट चुना जाए, तो क्विक सॉर्ट की जटिलता O(n²) हो जाती है।',
    difficulty: 'Medium',
    pyqReference: 'BPSC TRE 2.0 (2023)'
  },
  {
    id: 'mcq-10',
    topicId: 'unit-8',
    topicName: 'Cyber Security & IT Act',
    question: 'Under the Information Technology (IT) Act, 2000 of India, which section penalizes hacking with computer systems and data theft?',
    questionHindi: 'भारत के सूचना प्रौद्योगिकी (IT) अधिनियम, 2000 के तहत कौन सी धारा कंप्यूटर सिस्टम की हैकिंग और डेटा चोरी के लिए दंड का प्रावधान करती है?',
    options: ['Section 66', 'Section 43', 'Section 67', 'Section 72'],
    optionsHindi: ['धारा 66 (Section 66)', 'धारा 43 (Section 43)', 'धारा 67 (Section 67)', 'धारा 72 (Section 72)'],
    correctIndex: 0,
    explanation: 'Section 66 of the IT Act 2000 deals with Computer Related Offences (Hacking), prescribing up to 3 years imprisonment or fine up to ₹5 lakh.',
    explanationHindi: 'आईटी अधिनियम 2000 की धारा 66 कंप्यूटर से संबंधित अपराधों (हैकिंग) के लिए दंडात्मक प्रावधान करती है।',
    difficulty: 'Hard',
    pyqReference: 'BPSC TRE 2.0 (2023)'
  },
  {
    id: 'mcq-11',
    topicId: 'unit-5',
    topicName: 'Computer Networks',
    question: 'In IPv4 addressing, what is the default subnet mask for a Class C network?',
    questionHindi: 'IPv4 एड्रेसिंग में, क्लास C नेटवर्क के लिए डिफ़ॉल्ट सबनेट मास्क क्या होता है?',
    options: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.255'],
    optionsHindi: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.255'],
    correctIndex: 0,
    explanation: 'Class A default mask is 255.0.0.0 (/8), Class B is 255.255.0.0 (/16), and Class C is 255.255.255.0 (/24).',
    explanationHindi: 'क्लास C में पहले 24 बिट नेटवर्क ID के लिए होते हैं, इसलिए इसका डिफ़ॉल्ट सबनेट मास्क 255.255.255.0 होता है।',
    difficulty: 'Easy',
    pyqReference: 'BPSC TRE 1.0 (2023)'
  },
  {
    id: 'mcq-12',
    topicId: 'unit-7',
    topicName: 'Software Engineering',
    question: 'Which software testing method tests individual units or components of source code in isolation?',
    questionHindi: 'कौन सी सॉफ्टवेयर टेस्टिंग विधि सोर्स कोड की व्यक्तिगत इकाइयों या घटकों का अलग से परीक्षण करती है?',
    options: ['Unit Testing', 'Integration Testing', 'System Testing', 'Acceptance Testing'],
    optionsHindi: ['यूनिट टेस्टिंग (Unit Testing)', 'इंटीग्रेशन टेस्टिंग', 'सिस्टम टेस्टिंग', 'एक्सेप्टेंस टेस्टिंग'],
    correctIndex: 0,
    explanation: 'Unit Testing is the first level of software testing where individual units/components of code are tested in isolation, usually by developers.',
    explanationHindi: 'यूनिट टेस्टिंग में प्रोग्राम के सबसे छोटे स्वतंत्र कोड ब्लॉक (फंक्शंस/मेथड्स) की स्वतंत्र रूप से जांच की जाती है।',
    difficulty: 'Easy',
    pyqReference: 'BPSC TRE 3.0 (2024)'
  }
];

export const PDF_PRODUCTS_DATA: PDFProduct[] = [
  {
    id: 'pdf-session-01',
    sessionNumber: 1,
    title: 'Session 01 – Computer Fundamentals & Architecture',
    titleHindi: 'सत्र 01 – कंप्यूटर फंडामेंटल्स और वास्तुकला',
    category: 'Fundamentals',
    pages: 18,
    fileSize: '2.4 MB',
    price: 1,
    isFree: false,
    description: 'Generations of computers, Von Neumann architecture, CPU registers, Bus types, Memory hierarchy (Cache L1-L3, RAM, ROM, Hit ratio), and BIOS/POST process.',
    topicsCovered: ['Von Neumann Model', 'System Bus', 'Cache Memory Hit/Miss', 'RAM/ROM Types', 'BIOS Boot Cycle', 'BPSC TRE High Yield PYQ Notes'],
    samplePreview: [
      'Page 1: Architecture of Modern Computers (Von Neumann vs Harvard)',
      'Page 2: Memory Hierarchy & Cache Calculations with Formulas',
      'Page 3: Input/Output Interfaces & DMA Controller Working'
    ]
  },
  {
    id: 'pdf-session-02',
    sessionNumber: 2,
    title: 'Session 02 – Number System & Data Representation',
    titleHindi: 'सत्र 02 – संख्या प्रणाली और डेटा निरूपण',
    category: 'Digital Electronics',
    pages: 22,
    fileSize: '3.1 MB',
    price: 1,
    isFree: false,
    description: 'Binary, Octal, Hexadecimal conversions, 1\'s & 2\'s complement arithmetic, Overflow conditions, BCD, Gray Code, Excess-3, and IEEE 754 Floating Point Representation.',
    topicsCovered: ['Base Conversions Fast Tricks', '2\'s Complement Math', 'BCD & Gray Code Unit Distance', 'IEEE 754 Single/Double Precision', 'PYQ Solved Traps'],
    samplePreview: [
      'Page 1: Universal Conversion Matrix (Dec/Bin/Oct/Hex)',
      'Page 2: Signed Integer Range & 2\'s Complement Overflow Rules',
      'Page 3: IEEE 754 Mantissa and Biased Exponent Breakdown'
    ]
  },
  {
    id: 'pdf-session-03',
    sessionNumber: 3,
    title: 'Session 03 – Boolean Algebra & Logic Gates',
    titleHindi: 'सत्र 03 – बूलियन बीजगणित और लॉजिक गेट्स',
    category: 'Digital Electronics',
    pages: 20,
    fileSize: '2.8 MB',
    price: 1,
    isFree: false,
    description: 'Basic & Universal Gates (NAND, NOR implementation), Boolean Postulates, De Morgan\'s Laws, SOP & POS forms, 2/3/4-Variable Karnaugh Maps (K-Map), Don\'t Care conditions.',
    topicsCovered: ['Universal Gate Minimum Counts', 'De Morgan Theorem Proofs', 'K-Map Minimization Rules', 'Minterms & Maxterms', 'Adders & Multiplexers'],
    samplePreview: [
      'Page 1: Logic Gates Truth Tables & Symbol Summary',
      'Page 2: Number of NAND/NOR Gates Required for Standard Gates',
      'Page 3: 4-Variable K-Map Grouping & Don\'t Care Elimination'
    ]
  },
  {
    id: 'pdf-session-04',
    sessionNumber: 4,
    title: 'Session 04 – Data Representation & Microprocessors',
    titleHindi: 'सत्र 04 – डेटा निरूपण और माइक्रोप्रोसेसर 8085',
    category: 'Architecture',
    pages: 19,
    fileSize: '2.7 MB',
    price: 1,
    isFree: false,
    description: 'Character encodings (ASCII, ISCII, Unicode UTF-8), Microprocessor 8085 pin diagram basics, instruction cycle (Fetch, Decode, Execute), Addressing modes, and Pipelining hazards.',
    topicsCovered: ['ASCII vs Unicode Bit Widths', '8085 Register Organization', 'Addressing Modes with Examples', 'Pipelining Speedup Ratio Formula'],
    samplePreview: [
      'Page 1: Character Encoding Comparison Matrix',
      'Page 2: 8085 Accumulator & Status Flags (S, Z, AC, P, CY)',
      'Page 3: Pipeline Hazards: Structural, Data, Control'
    ]
  },
  {
    id: 'pdf-session-05',
    sessionNumber: 5,
    title: 'Session 05 – Programming Fundamentals (C++ & Python)',
    titleHindi: 'सत्र 05 – प्रोग्रामिंग फंडामेंटल्स (C++ और पाइथन)',
    category: 'Programming',
    pages: 26,
    fileSize: '3.6 MB',
    price: 1,
    isFree: false,
    description: 'C++ & Python syntax comparison, OOP 4 pillars, Constructors, Destructors, Virtual functions, Operator overloading, Pointers vs References, Lambda, List Comprehensions.',
    topicsCovered: ['C++ vs Python Cheat Sheet', 'OOP Encapsulation & Inheritance Types', 'Dynamic Polymorphism & vtable', 'Memory Management (malloc/new)'],
    samplePreview: [
      'Page 1: C++ & Python Keyword & Token Reference',
      'Page 2: OOP Four Pillars with NCERT Real-life Examples',
      'Page 3: Pointers Arithmetic & Function Pointers in C++'
    ]
  },
  {
    id: 'pdf-session-06',
    sessionNumber: 6,
    title: 'Session 06 – Data Structures & Algorithm Complexities',
    titleHindi: 'सत्र 06 – डेटा संरचनाएँ और एल्गोरिदम जटिलता',
    category: 'Core CS',
    pages: 28,
    fileSize: '3.9 MB',
    price: 1,
    isFree: false,
    description: 'Arrays, Linked Lists (Singly, Doubly, Circular), Stacks (Infix to Postfix), Queues (Circular, Deque), Binary Trees, BST, AVL Trees, Heap, and Sorting complexity comparison table.',
    topicsCovered: ['Stack Applications & Expression Evaluation', 'Tree Traversals (Inorder/Pre/Post)', 'Master Theorem for Time Complexity', 'Comparison Table for All 7 Sorting Algos'],
    samplePreview: [
      'Page 1: Time & Space Complexities Master Cheatsheet',
      'Page 2: Stack Conversion Algorithm Step-by-Step with Diagrams',
      'Page 3: Binary Search Tree Insertion, Deletion Cases'
    ]
  },
  {
    id: 'pdf-session-07',
    sessionNumber: 7,
    title: 'Session 07 – Database Management Systems & SQL',
    titleHindi: 'सत्र 07 – डेटाबेस प्रबंधन प्रणाली और SQL',
    category: 'Core CS',
    pages: 25,
    fileSize: '3.5 MB',
    price: 1,
    isFree: false,
    description: 'ER Modeling, Relational Algebra operators, Keys (Candidate, Primary, Super, Foreign), Normalization (1NF, 2NF, 3NF, BCNF with functional dependencies), SQL Joins, ACID & Transactions.',
    topicsCovered: ['Functional Dependency Closure & Key Finding', '1NF to BCNF Elimination of Anomalies', 'SQL DDL vs DML Commands & Joins', 'ACID Properties & Serializability'],
    samplePreview: [
      'Page 1: Keys Identification Algorithm & Closure Sets',
      'Page 2: Normalization Step-by-step with Solved Examples',
      'Page 3: SQL Nested Subqueries and Aggregate Grouping'
    ]
  },
  {
    id: 'pdf-session-08',
    sessionNumber: 8,
    title: 'Session 08 – Computer Networks & Data Communication',
    titleHindi: 'सत्र 08 – कंप्यूटर नेटवर्क और डेटा संचार',
    category: 'Systems',
    pages: 27,
    fileSize: '3.7 MB',
    price: 1,
    isFree: false,
    description: 'OSI 7 Layers, TCP/IP Model, Guided & Unguided Media, IPv4 Addressing & CIDR Subnetting math, Protocols (HTTP, DNS, ARP, DHCP, TCP, UDP), Routing algorithms.',
    topicsCovered: ['OSI 7 Layer Protocols & PDUs', 'Subnetting Calculation Fast Tricks', 'TCP 3-Way Handshake vs UDP', 'Routing: Distance Vector vs Link State'],
    samplePreview: [
      'Page 1: Comprehensive OSI vs TCP/IP Comparison Chart',
      'Page 2: CIDR Subnetting Formulas & Solved Numerical Questions',
      'Page 3: Application Layer Port Numbers & Protocol Working'
    ]
  },
  {
    id: 'pdf-session-09',
    sessionNumber: 9,
    title: 'Session 09 – Operating Systems & Scheduling',
    titleHindi: 'सत्र 09 – ऑपरेटिंग सिस्टम और शेड्यूलिंग',
    category: 'Systems',
    pages: 24,
    fileSize: '3.3 MB',
    price: 1,
    isFree: false,
    description: 'Process states, PCB, CPU Scheduling (FCFS, SJF, RR, Priority with Gantt charts), Process synchronization (Semaphores, Mutex), Deadlocks (Banker\'s algorithm), Paging & Virtual memory.',
    topicsCovered: ['Gantt Chart & Turnaround/Waiting Time Math', '4 Deadlock Conditions & Prevention', 'Banker\'s Safety Algorithm Steps', 'Page Replacement Algorithms (FIFO, LRU, Optimal)'],
    samplePreview: [
      'Page 1: Process State Diagram & Context Switching Steps',
      'Page 2: CPU Scheduling Comparative Matrix with Examples',
      'Page 3: Memory Paging, TLB Hit/Miss & Effective Access Time'
    ]
  },
  {
    id: 'pdf-session-10',
    sessionNumber: 10,
    title: 'Session 10 – Cyber Security, Web Tech & Emerging Trends',
    titleHindi: 'सत्र 10 – साइबर सुरक्षा, वेब तकनीक और उभरते रुझान',
    category: 'Security & Web',
    pages: 23,
    fileSize: '3.2 MB',
    price: 1,
    isFree: false,
    description: 'Malware taxonomy (Viruses, Worms, Trojans, Spyware), Symmetric vs Asymmetric Cryptography (AES, DES, RSA), Firewalls, HTML5/CSS3/JS basics, IT Act 2000, AI & Cloud Computing models.',
    topicsCovered: ['Malware vs Phishing Defense', 'Public Key Cryptography (RSA Steps)', 'IT Act 2000 Key Sections (43, 66, 67)', 'Cloud Computing Service Models (IaaS, PaaS, SaaS)'],
    samplePreview: [
      'Page 1: Cyber Attack Classification & Defense Protocols',
      'Page 2: Cryptographic Algorithms Matrix (RSA, AES, SHA-256)',
      'Page 3: HTML5 Semantic Elements & HTTP Status Codes'
    ]
  },
  {
    id: 'pdf-session-11',
    sessionNumber: 11,
    title: 'Session 11 – Software Engineering & SDLC Master Sheet',
    titleHindi: 'सत्र 11 – सॉफ्टवेयर इंजीनियरिंग और SDLC मास्टर शीट',
    category: 'Software',
    pages: 20,
    fileSize: '2.9 MB',
    price: 1,
    isFree: false,
    description: 'SDLC Phases, Waterfall, Spiral, Agile Scrum framework, White-box vs Black-box Testing, Cyclomatic Complexity calculation, Cohesion & Coupling principles.',
    topicsCovered: ['SDLC Models Comparison', 'McCabe\'s Cyclomatic Complexity Formula', 'Types of Cohesion (Low to High)', 'Types of Coupling (High to Low)'],
    samplePreview: [
      'Page 1: SDLC Life Cycle & When to choose which model',
      'Page 2: McCabe Flow Graph & Complexity V(G) Calculation',
      'Page 3: Testing Levels & Verification vs Validation'
    ]
  },
  {
    id: 'pdf-session-12',
    sessionNumber: 12,
    title: 'Session 12 – BPSC TRE 1.0, 2.0 & 3.0 Solved PYQs Master Note',
    titleHindi: 'सत्र 12 – BPSC TRE 1.0, 2.0 और 3.0 हल किए गए PYQs मास्टर नोट',
    category: 'PYQ Master',
    pages: 32,
    fileSize: '4.5 MB',
    price: 1,
    isFree: false,
    description: 'Detailed analysis of all BPSC TRE Computer Science previous year question papers (TRE 1.0, 2.0, 3.0) with official answer keys, question pattern trends, and high-frequency topics.',
    topicsCovered: ['BPSC TRE 1.0 Solved Questions', 'BPSC TRE 2.0 Complete Detailed Analysis', 'BPSC TRE 3.0 Paper Solutions', 'Exam Trap Alerts & Negative Marking Strategy'],
    samplePreview: [
      'Page 1: Topic-wise Question Distribution in TRE 1.0, 2.0 & 3.0',
      'Page 2: Top 50 Most Repeated Concepts in Bihar CS Exams',
      'Page 3: Official BPSC Answer Key Clarifications & Ambiguities'
    ]
  }
];

export const CHAPTER_NOTES_DATA: ChapterNote[] = [
  {
    id: 'note-session-01',
    sessionNumber: 1,
    title: 'Computer Fundamentals & Architecture',
    titleHindi: 'कंप्यूटर फंडामेंटल्स और वास्तुकla',
    category: 'Fundamentals',
    totalPages: 18,
    fileSize: '2.4 MB',
    price: 1,
    isFree: true, // Free sample note!
    coverBadge: 'Free Sample Available',
    shortSummary: 'Comprehensive overview of computer generations, Von Neumann architecture, CPU execution cycles, memory hierarchy, cache memory hit-rate formulas, and secondary storage.',
    shortSummaryHindi: 'कंप्यूटर पीढ़ियों, वॉन न्यूमैन आर्किटेक्चर, सीपीयू निष्पादन चक्र, मेमोरी पदानुक्रम, कैश मेमोरी हिट-रेट और सेकेंडरी स्टोरेज का संपूर्ण सार।',
    shortNotes: [
      'Von Neumann Architecture consists of CPU, Memory, and Input/Output units communicating over a shared System Bus (Data Bus, Address Bus, Control Bus).',
      'Data Bus is bidirectional; Address Bus is unidirectional (emanating from CPU to memory/IO).',
      'Memory Hierarchy: CPU Registers (Fastest, Smallest) > L1 Cache > L2 Cache > L3 Cache > Main Memory (RAM) > Secondary Storage (SSD/HDD).',
      'Cache Hit Ratio (H) = Hits / (Hits + Misses). Effective Memory Access Time (EMAT) = H × Tc + (1 - H) × Tm.',
      'SRAM uses flip-flops and is faster (used in Cache); DRAM uses capacitors that require periodic refreshing (used in Main Memory).',
      'BIOS (Basic Input/Output System) stored in ROM executes POST (Power-On Self-Test) before bootstrapping the OS into RAM.'
    ],
    detailedNotes: [
      {
        heading: '1. The Von Neumann vs Harvard Architecture',
        headingHindi: 'वॉन न्यूमैन बनाम हार्वर्ड आर्किटेक्चर',
        content: 'In 1945, John von Neumann proposed the stored-program concept where program instructions and data share the same physical memory and bus system. This leads to the famous "Von Neumann Bottleneck" where data throughput is limited because instructions and data cannot be accessed simultaneously. In contrast, Harvard architecture features separate physical memory buses for instructions and data.',
        points: [
          'Shared memory for instructions & data',
          'Sequential instruction execution via Program Counter (PC)',
          'Components: ALU, Control Unit, Accumulator, Memory Unit, IO Interfaces',
          'Von Neumann Bottleneck: Single shared bus causes throughput limit'
        ]
      },
      {
        heading: '2. CPU Registers & Instruction Cycle',
        headingHindi: 'सीपीयू रजिस्टर्स और निर्देश चक्र',
        content: 'The Instruction Cycle consists of four phases: Fetch -> Decode -> Execute -> Store. Specialized CPU registers facilitate this process:',
        points: [
          'PC (Program Counter): Holds the memory address of the NEXT instruction to be fetched.',
          'MAR (Memory Address Register): Holds the address of the memory location currently being read/written.',
          'MDR / MBR (Memory Data/Buffer Register): Holds the data read from or to be written to memory.',
          'IR (Instruction Register): Holds the currently decoded instruction opcode.',
          'Accumulator (AC): Holds temporary intermediate arithmetic and logic operands and results.'
        ]
      },
      {
        heading: '3. Cache Memory Organization and Hit Ratio',
        headingHindi: 'कैश मेमोरी संगठन और हिट अनुपात',
        content: 'Cache memory bridges the immense speed gap between the high-speed CPU core (GHz) and relatively slow DRAM (nanoseconds). It exploits Principle of Locality (Temporal Locality: recently accessed items will be accessed again soon; Spatial Locality: adjacent memory locations will be accessed soon).',
        formula: 'EMAT = H * T_cache + (1 - H) * (T_cache + T_main_memory)'
      }
    ],
    definitions: [
      {
        term: 'Von Neumann Bottleneck',
        termHindi: 'वॉन न्यूमैन बाधा',
        definition: 'A throughput limitation caused by standard computers using a single shared bus for both instruction fetching and data transfer.',
        definitionHindi: 'डेटा और निर्देशों के लिए एक ही साझा बस होने के कारण सीपीयू और मेमोरी के बीच उत्पन्न होने वाली गति सीमा।'
      },
      {
        term: 'Program Counter (PC)',
        termHindi: 'प्रोग्राम काउंटर (PC)',
        definition: 'A CPU register containing the address of the next machine instruction to be fetched and executed.',
        definitionHindi: 'एक विशेष सीपीयू रजिस्टर जो निष्पादित होने वाले अगले निर्देश के मेमोरी पते को संग्रहीत करता है।'
      },
      {
        term: 'Cache Hit Ratio',
        termHindi: 'कैश हिट रेशियो',
        definition: 'The fraction of memory accesses that are found in the cache memory (Hits / Total Accesses).',
        definitionHindi: 'कैश में पाए जाने वाले मेमोरी एक्सेस का कुल एक्सेस के साथ अनुपात।'
      }
    ],
    formulas: [
      {
        title: 'Effective Memory Access Time (EMAT)',
        formula: 'EMAT = H × Tc + (1 - H) × (Tc + Tm)',
        explanation: 'Where H is hit ratio, Tc is cache access latency (typically 1-2 ns), and Tm is main memory access latency (typically 50-80 ns).'
      },
      {
        title: 'Address Bus Capacity',
        formula: 'Max Addressable Memory = 2^N bytes (for N address lines & byte addressing)',
        explanation: 'An address bus of 32 bits can address 2^32 bytes = 4 GB of RAM.'
      }
    ],
    examples: [
      {
        title: 'EMAT Calculation for BPSC TRE',
        description: 'Suppose cache access time is 2 ns, main memory access time is 50 ns, and cache hit ratio is 90% (0.90).',
        codeOrFormula: 'EMAT = (0.90 × 2) + (0.10 × (2 + 50)) = 1.8 + 5.2 = 7.0 ns.'
      }
    ],
    examPoints: [
      'Direct Question in TRE 2.0: Which register holds the address of the next instruction? Answer: Program Counter (PC).',
      'Address Bus is UNIDIRECTIONAL (from CPU to Memory); Data Bus is BIDIRECTIONAL.',
      'DRAM requires periodic capacitive refreshing; SRAM is made of bistable latching flip-flops and does not need refreshing.',
      'POST (Power-On Self Test) is stored in ROM/Flash, executed by BIOS during the boot sequence.'
    ],
    mcqs: [MOCK_MCQS[0], MOCK_MCQS[10]],
    previewPages: [
      'Session 1 Overview: Von Neumann Architecture & Bus Structure',
      'Memory Hierarchy: Registers, L1/L2/L3 Cache, RAM, ROM',
      'Instruction Cycle: Fetch, Decode, Execute, Writeback'
    ]
  },
  {
    id: 'note-session-02',
    sessionNumber: 2,
    title: 'Number System & Data Representation',
    titleHindi: 'संख्या प्रणाली और डेटा निरूपण',
    category: 'Digital Electronics',
    totalPages: 22,
    fileSize: '3.1 MB',
    price: 1,
    isFree: false,
    coverBadge: 'Only ₹1',
    shortSummary: 'Master binary, octal, decimal, hexadecimal conversions, 1\'s and 2\'s complement arithmetic, signed number ranges, BCD, Gray code, and IEEE 754 floating-point standards.',
    shortSummaryHindi: 'बाइनरी, ऑक्टल, डेसिमल, हेक्साडेसिमल रूपांतरण, 1\'s और 2\'s पूरक अंकगणित, बीसीडी, ग्रे कोड और आईईईई 754 फ्लोटिंग पॉइंट मानक।',
    shortNotes: [
      'Radix (Base): Binary (2), Octal (8), Decimal (10), Hexadecimal (16).',
      'Fast Conversion: 1 Octal digit = 3 Binary bits. 1 Hexadecimal digit = 4 Binary bits.',
      'Range of signed n-bit numbers in 2\'s complement: -2^(n-1) to +(2^(n-1) - 1). For 8 bits: -128 to +127.',
      'In 2\'s complement, MSB (Most Significant Bit) = 1 represents negative; MSB = 0 represents positive.',
      'Gray Code is an unweighted unit-distance code where only ONE bit changes between successive numbers.',
      'IEEE 754 Single Precision: 32 bits = 1 Sign bit + 8 Exponent bits (Bias 127) + 23 Mantissa bits.'
    ],
    detailedNotes: [
      {
        heading: '1. Fast Radix Conversions',
        headingHindi: 'त्वरित आधार रूपांतरण',
        content: 'To convert hexadecimal to binary, map each hex digit to 4 binary bits (e.g., (A5F)_16 -> A=1010, 5=0101, F=1111 -> 101001011111_2). To convert binary to octal, group binary bits in 3s starting from the binary point outwards.',
        points: [
          'Binary to Hex: Group in 4s from binary point',
          'Binary to Octal: Group in 3s from binary point',
          'Fractional conversion: Multiply fractional decimal by target base repeatedly'
        ]
      },
      {
        heading: '2. 1\'s and 2\'s Complement Representation',
        headingHindi: '1\'s और 2\'s पूरक विधि',
        content: '2\'s complement is preferred in modern ALUs because it has only ONE representation for zero (00000000), unlike 1\'s complement which has +0 and -0. Furthermore, subtraction is performed simply by adding the 2\'s complement of the subtrahend.',
        points: [
          '1\'s complement: Invert all bits (0 -> 1, 1 -> 0)',
          '2\'s complement: 1\'s complement + 1',
          'Shortcut for 2\'s complement: Scan from right to left, keep bits unchanged up to and including the first 1, then invert all remaining bits to the left'
        ]
      }
    ],
    definitions: [
      {
        term: 'Gray Code (Reflected Binary)',
        termHindi: 'ग्रे कोड',
        definition: 'A non-weighted binary code in which two successive values differ in only one bit position, eliminating spurious glitch states in rotary encoders and K-maps.',
        definitionHindi: 'एक गैर-भारित कोड जिसमें दो क्रमिक संख्याओं के बीच केवल एक बिट का अंतर होता है।'
      },
      {
        term: 'Excess-3 Code',
        termHindi: 'एक्सेस-3 कोड',
        definition: 'A self-complementing unweighted BCD code formed by adding 3 (0011) to each BCD digit.',
        definitionHindi: 'एक स्व-पूरक कोड जो प्रत्येक बीसीडी अंक में 3 जोड़कर प्राप्त होता है।'
      }
    ],
    formulas: [
      {
        title: 'Range of n-bit 2\'s Complement Numbers',
        formula: '[-2^(n-1), 2^(n-1) - 1]',
        explanation: 'For 8 bits: [-128, +127]. For 16 bits: [-32768, +32767].'
      },
      {
        title: 'IEEE 754 Floating Point Value Formula',
        formula: 'Value = (-1)^S × (1.M) × 2^(E - 127)',
        explanation: 'Where S = Sign bit, E = Biased Exponent (8 bits), M = Fractional Mantissa (23 bits).'
      }
    ],
    examples: [
      {
        title: 'Convert Decimal -25 to 8-bit 2\'s Complement',
        description: '+25 in 8 bits = 00011001. Invert bits (1\'s complement) = 11100110. Add 1 = 11100111.',
        codeOrFormula: '11100111 (Binary) = -25 (Decimal in 8-bit 2\'s complement)'
      }
    ],
    examPoints: [
      'BPSC TRE Favorite: "Why is 2\'s complement preferred in computer systems?" Answer: Unique zero representation and simpler ALU subtraction circuitry.',
      'Gray code is widely used in K-Maps and optical shaft encoders due to single bit transition.',
      'Excess-3 is a self-complementing code; BCD (8421) is NOT self-complementing.'
    ],
    mcqs: [MOCK_MCQS[0]],
    previewPages: [
      'Number Systems Table: Bin, Oct, Dec, Hex with shortcuts',
      'Complement Arithmetic: 1s, 2s, 9s, 10s Complements',
      'IEEE 754 Floating Point Architecture with Solved Examples'
    ]
  },
  {
    id: 'note-session-03',
    sessionNumber: 3,
    title: 'Boolean Algebra & Logic Gates',
    titleHindi: 'बूलियन बीजगणित और लॉजिक गेट्स',
    category: 'Digital Electronics',
    totalPages: 20,
    fileSize: '2.8 MB',
    price: 1,
    isFree: false,
    coverBadge: 'Only ₹1',
    shortSummary: 'Complete coverage of Boolean theorems, De Morgan\'s laws, NAND & NOR universal gates implementation counts, Karnaugh Maps (K-Map), SOP/POS reduction, and arithmetic logic circuits.',
    shortSummaryHindi: 'बूलियन प्रमेय, डी मॉर्गन नियम, नंद और नोर यूनिवर्सल गेट्स, 2/3/4 वेरिएबल के-मैप न्यूनीकरण, एसओपी और पीओएस का विस्तृत विश्लेषण।',
    shortNotes: [
      'Universal Gates: NAND and NOR can implement ANY Boolean function without any other gate.',
      'Minimum NAND gates required: NOT (1), AND (2), OR (3), NOR (4), XOR (4), XNOR (5).',
      'Minimum NOR gates required: NOT (1), OR (2), AND (3), NAND (4), XNOR (4), XOR (5).',
      'De Morgan\'s Laws: (A + B)\' = A\' · B\' and (A · B)\' = A\' + B\'.',
      'Karnaugh Map (K-Map) groups must be powers of 2 (1, 2, 4, 8, 16 cells). Grouping 2^k cells eliminates k variables.',
      'Don\'t Care conditions (d or X) can be treated as 1 or 0 to form the largest possible group in K-Maps.'
    ],
    detailedNotes: [
      {
        heading: '1. Universal Gates and Implementation Matrix',
        headingHindi: 'यूनिवर्सल गेट्स और कार्यान्वयन मैट्रिक्स',
        content: 'NAND and NOR gates are termed "Universal Gates" because any combinatorial logic circuit can be designed solely using either of them. In VLSI chip fabrication, NAND gates are preferred over NOR due to higher electron mobility and smaller silicon area in CMOS technology.',
        points: [
          'NAND as NOT: Connect both inputs together',
          'NAND as AND: Invert output of NAND using another NAND',
          'NAND as OR: Invert inputs using NAND, then feed into NAND',
          'XOR requires 4 NAND gates; XNOR requires 5 NAND gates'
        ]
      },
      {
        heading: '2. Karnaugh Map (K-Map) Simplification',
        headingHindi: 'के-मैप द्वारा समीकरण का सरलीकरण',
        content: 'K-Map uses Gray code ordering for adjacent cells (00, 01, 11, 10). This ensures that adjacent cells differ by only one variable, allowing algebraic minimization by visual grouping.',
        points: [
          'Pair (2 cells): Eliminates 1 variable',
          'Quad (4 cells): Eliminates 2 variables',
          'Octet (8 cells): Eliminates 3 variables',
          'Always look for corner wraparounds and largest possible groups first'
        ]
      }
    ],
    definitions: [
      {
        term: 'Universal Gate',
        termHindi: 'यूनिवर्सल गेट',
        definition: 'A logic gate that can implement any Boolean function without using any other type of gate (NAND and NOR).',
        definitionHindi: 'एक ऐसा लॉजिक गेट जो बिना किसी अन्य गेट की सहायता के किसी भी बूलियन फलन को निष्पादित कर सकता है (NAND एवं NOR)।'
      },
      {
        term: 'Prime Implicant (PI)',
        termHindi: 'प्राइम इम्प्लिकेंट',
        definition: 'A rectangle or square group of 2^k adjacent 1s in a K-Map that cannot be combined with any larger group.',
        definitionHindi: 'के-मैप में 2^k कोशिकाओं का सबसे बड़ा समूह जिसे किसी अन्य बड़े समूह में शामिल नहीं किया जा सकता।'
      }
    ],
    formulas: [
      {
        title: 'De Morgan\'s Law 1 (NOR to AND)',
        formula: '(A + B)\' = A\' · B\'',
        explanation: 'Complement of sum is equal to the product of complements.'
      },
      {
        title: 'De Morgan\'s Law 2 (NAND to OR)',
        formula: '(A · B)\' = A\' + B\'',
        explanation: 'Complement of product is equal to the sum of complements.'
      }
    ],
    examples: [
      {
        title: 'Simplification Example using Boolean Postulates',
        description: 'Simplify F = A B + A B\'',
        codeOrFormula: 'F = A (B + B\') = A (1) = A'
      }
    ],
    examPoints: [
      'Frequent BPSC Question: Number of NAND gates to implement XOR = 4.',
      'Number of NOR gates to implement XNOR = 4.',
      'K-Map adjacent cell numbering follows GRAY CODE (00, 01, 11, 10) not binary order.',
      'Full Adder requires 2 Half Adders and 1 OR Gate.'
    ],
    mcqs: [MOCK_MCQS[6]],
    previewPages: [
      'Truth Tables of 7 Basic & Derived Logic Gates',
      'Minimum Gate Count Cheatsheet for NAND and NOR',
      'K-Map 2/3/4 Variable Maps with Solved BPSC Questions'
    ]
  },
  {
    id: 'note-session-06',
    sessionNumber: 6,
    title: 'Data Structures & Algorithms',
    titleHindi: 'डेटा संरचनाएँ और एल्गोरिदम',
    category: 'Core CS',
    totalPages: 28,
    fileSize: '3.9 MB',
    price: 1,
    isFree: false,
    coverBadge: 'Only ₹1',
    shortSummary: 'Arrays, Singly/Doubly Linked Lists, Stacks applications (Infix/Postfix), Circular Queues, Binary Search Trees, AVL Trees, Heap, and Sorting algorithm complexities.',
    shortSummaryHindi: 'ऐरे, लिंक्ड लिस्ट, स्टैक, कतार, बाइनरी सर्च ट्री, एवीएल ट्री, हीप और सभी सॉर्टिंग एल्गोरिदम की समय जटिलता तालिका।',
    shortNotes: [
      'Stack follows LIFO (Last In First Out); Queue follows FIFO (First In First Out).',
      'Stack Applications: Expression evaluation, Infix to Postfix conversion, Backtracking, Function call stack recursion.',
      'Circular Queue condition for FULL: (rear + 1) % capacity == front.',
      'BST (Binary Search Tree) Inorder Traversal ALWAYS produces sorted values in ascending order.',
      'Worst case time complexities: Quick Sort = O(n²), Merge Sort = O(n log n), Heap Sort = O(n log n).',
      'Binary Search requires the array to be sorted. Time complexity: O(log n).'
    ],
    detailedNotes: [
      {
        heading: '1. Infix to Postfix Conversion using Stack',
        headingHindi: 'स्टैक द्वारा इनफिक्स से पोस्टफिक्स रूपांतरण',
        content: 'Operators are pushed to the stack based on precedence and associativity. Parentheses are used to alter default precedence. When an operator of lower or equal precedence arrives, higher precedence operators are popped and outputted.',
        points: [
          'Operands: Output immediately',
          'Left parenthesis "(": Push to stack',
          'Right parenthesis ")": Pop and output until matching "(" is encountered',
          'Operators: Pop operators from stack that have >= precedence before pushing incoming operator'
        ]
      },
      {
        heading: '2. Sorting Complexities Comprehensive Table',
        headingHindi: 'सॉर्टिंग एल्गोरिदम जटिलता तुलना तालिका',
        content: 'Merge Sort and Heap Sort guarantee O(n log n) even in the worst case. Quick Sort has an average case of O(n log n) with low constant factors, but degrades to O(n²) when the pivot partition is heavily unbalanced.',
        points: [
          'Bubble / Insertion / Selection Sort: Best O(n) (Insertion), Worst O(n²), Space O(1)',
          'Merge Sort: Best/Avg/Worst O(n log n), Space O(n), Stable: YES',
          'Quick Sort: Avg O(n log n), Worst O(n²), Space O(log n), Stable: NO',
          'Heap Sort: Best/Avg/Worst O(n log n), Space O(1), Stable: NO'
        ]
      }
    ],
    definitions: [
      {
        term: 'Binary Search Tree (BST)',
        termHindi: 'बाइनरी सर्च ट्री (BST)',
        definition: 'A binary tree where the key in every node is strictly greater than all keys in its left subtree and smaller than all keys in its right subtree.',
        definitionHindi: 'एक ऐसा बाइनरी ट्री जिसमें प्रत्येक नोड का मान उसके बाएं सबट्री के सभी मानों से बड़ा और दाएं सबट्री के सभी मानों से छोटा होता है।'
      },
      {
        term: 'AVL Tree',
        termHindi: 'एवीएल ट्री (AVL Tree)',
        definition: 'A self-balancing binary search tree where the height difference (Balance Factor = Height_Left - Height_Right) between left and right subtrees is at most 1 (-1, 0, +1).',
        definitionHindi: 'एक स्व-संतुलित बाइनरी सर्च ट्री जिसमें प्रत्येक नोड का बैलेंस फैक्टर केवल -1, 0 या +1 हो सकता है।'
      }
    ],
    formulas: [
      {
        title: 'Number of Binary Trees with n Nodes (Catalan Number)',
        formula: 'T(n) = (1 / (n + 1)) × 2nCn',
        explanation: 'For n = 3 nodes, total structurally distinct binary trees = (1/4) × 6C3 = 20 / 4 = 5.'
      },
      {
        title: 'Circular Queue Full Condition',
        formula: '(rear + 1) % MAX == front',
        explanation: 'Leaves one empty space to distinguish between FULL and EMPTY states.'
      }
    ],
    examples: [
      {
        title: 'Postfix Evaluation Example',
        description: 'Evaluate: 6 3 2 + *',
        codeOrFormula: 'Step 1: Push 6. Step 2: Push 3. Step 3: Push 2. Step 4: "+" -> Pop 2 and 3, add -> 5. Step 5: "*" -> Pop 5 and 6, multiply -> 30. Result = 30.'
      }
    ],
    examPoints: [
      'Direct BPSC TRE 2.0 Question: Inorder traversal of BST gives keys in ASCENDING ORDER.',
      'Which sorting algorithm is NOT in-place? Merge Sort (requires O(n) auxiliary memory).',
      'Postfix evaluation uses a STACK data structure.'
    ],
    mcqs: [MOCK_MCQS[2], MOCK_MCQS[8]],
    previewPages: [
      'Linear Data Structures (Arrays & Linked Lists compared)',
      'Stack & Queue Applications with Conversion Algorithms',
      'Trees, Traversals and Sorting Complexity Comparison Matrix'
    ]
  },
  {
    id: 'note-session-07',
    sessionNumber: 7,
    title: 'Database Management Systems & SQL',
    titleHindi: 'डेटाबेस प्रबंधन प्रणाली और SQL',
    category: 'Core CS',
    totalPages: 25,
    fileSize: '3.5 MB',
    price: 1,
    isFree: false,
    coverBadge: 'Only ₹1',
    shortSummary: 'ER Modeling, Candidate Keys, Normalization (1NF to BCNF with Functional Dependencies), SQL commands (DDL, DML, DCL), Joins, ACID transactions, and Concurrency Control.',
    shortSummaryHindi: 'ई-आर मॉडलिंग, कुंजी पहचान, सामान्यीकरण (1NF से BCNF), एसक्यूएल कमांड्स और जॉइन्स, एसिड गुण और लेनदेन नियंत्रण।',
    shortNotes: [
      'Super Key: A set of attributes that uniquely identifies a tuple. Candidate Key: A minimal super key.',
      'Primary Key: Selected candidate key that cannot contain NULL values.',
      '1NF: Eliminates multivalued or composite attributes (all attribute values must be atomic).',
      '2NF: 1NF + No partial dependency (every non-prime attribute must be fully functionally dependent on candidate key).',
      '3NF: 2NF + No transitive dependency (for X -> Y, either X is a super key or Y is a prime attribute).',
      'BCNF (Boyce-Codd NF): For every functional dependency X -> Y, X MUST be a Super Key.',
      'ACID Properties: Atomicity (All or Nothing), Consistency, Isolation (Concurrent transactions do not interfere), Durability (Committed updates persist).'
    ],
    detailedNotes: [
      {
        heading: '1. Relational Normalization Breakdown',
        headingHindi: 'रिलेशनल सामान्यीकरण चरण',
        content: 'Normalization eliminates redundancy and insertion, deletion, and update anomalies. A database is decomposed into smaller well-structured tables while preserving functional dependencies and lossless join decomposition.',
        points: [
          '1NF: Ensure atomic values (no repeating groups or lists)',
          '2NF: Remove partial dependencies of non-prime attributes on composite keys',
          '3NF: Remove transitive dependencies where non-prime determines non-prime',
          'BCNF: Strict 3NF where every determinant must be a candidate/super key'
        ]
      },
      {
        heading: '2. SQL Classification and Advanced Querying',
        headingHindi: 'SQL वर्गीकरण और क्वेरी',
        content: 'SQL statements are categorized into DDL (CREATE, ALTER, DROP, TRUNCATE), DML (SELECT, INSERT, UPDATE, DELETE), DCL (GRANT, REVOKE), and TCL (COMMIT, ROLLBACK, SAVEPOINT).',
        points: [
          'DROP deletes table structure and data; TRUNCATE deletes all data keeping structure (cannot be rolled back in standard SQL); DELETE deletes specific rows.',
          'WHERE filters rows BEFORE grouping; HAVING filters groups AFTER GROUP BY.',
          'INNER JOIN returns matching rows; LEFT JOIN returns all rows from left table and matched rows from right table.'
        ]
      }
    ],
    definitions: [
      {
        term: 'Candidate Key',
        termHindi: 'कैंडिडेट की (Candidate Key)',
        definition: 'A minimal set of attributes that can uniquely identify any tuple in a relation.',
        definitionHindi: 'एट्रिब्यूट का न्यूनतम समूह जो किसी टेबल के प्रत्येक टपल को विशिष्ट रूप से पहचान सके।'
      },
      {
        term: 'ACID Properties',
        termHindi: 'एसिड गुण (ACID Properties)',
        definition: 'Atomicity, Consistency, Isolation, Durability — the four fundamental properties that guarantee reliable database transaction processing.',
        definitionHindi: 'परमाणुता, निरंतरता, अलगाव और स्थायित्व — विश्वसनीय डेटाबेस लेनदेन की 4 मूल शर्तें।'
      }
    ],
    formulas: [
      {
        title: 'Degree vs Cardinality of a Relation',
        formula: 'Degree = Number of Attributes (Columns); Cardinality = Number of Tuples (Rows)',
        explanation: 'If a table has 5 columns and 100 rows, Degree = 5, Cardinality = 100.'
      }
    ],
    examples: [
      {
        title: 'Finding Candidate Key using Attribute Closure',
        description: 'Relation R(A, B, C, D) with FDs: {A -> B, B -> C, C -> D}.',
        codeOrFormula: 'Compute closure of A: (A)+ = {A, B, C, D}. Since closure contains all attributes, A is a Candidate Key!'
      }
    ],
    examPoints: [
      'BPSC TRE Question: Which clause filters groups created by GROUP BY? Answer: HAVING.',
      'Difference between TRUNCATE and DELETE: TRUNCATE is DDL (faster, resets table), DELETE is DML.',
      'A relation in BCNF is ALWAYS in 3NF, but a relation in 3NF may not be in BCNF.'
    ],
    mcqs: [MOCK_MCQS[1], MOCK_MCQS[7]],
    previewPages: [
      'ER Diagram Components: Weak entities, Multivalued attributes',
      'Normalization Step-by-Step with Functional Dependency Proofs',
      'SQL Joins, Subqueries & Aggregate Functions Cheatsheet'
    ]
  },
  {
    id: 'note-session-08',
    sessionNumber: 8,
    title: 'Computer Networks & Data Communication',
    titleHindi: 'कंप्यूटर नेटवर्क और डेटा संचार',
    category: 'Systems',
    totalPages: 27,
    fileSize: '3.7 MB',
    price: 1,
    isFree: false,
    coverBadge: 'Only ₹1',
    shortSummary: 'OSI 7 Layers model, TCP/IP protocol suite, Guided/Unguided transmission media, IPv4 classful vs CIDR subnetting calculations, TCP vs UDP, and Network Layer routing.',
    shortSummaryHindi: 'ओएसआई 7 लेयर मॉडल, टीसीपी/आईपी सूट, ट्रांसमिशन मीडिया, आईपीवी4 सबनेटिंग और सीआईडीआर, टीसीपी बनाम यूडीपी और रूटिंग एल्गोरिदम।',
    shortNotes: [
      'OSI 7 Layers (Bottom to Top): Physical, Data Link, Network, Transport, Session, Presentation, Application (Mnemonic: Please Do Not Throw Sausage Pizza Away).',
      'PDU at each layer: Physical = Bits, Data Link = Frames, Network = Packets, Transport = Segments, Application = Data/Messages.',
      'Data Link Layer uses MAC addresses (48 bits / 6 bytes, written in hex like 00:1A:2B:3C:4D:5E).',
      'Network Layer uses IP addresses (IPv4 = 32 bits, IPv6 = 128 bits).',
      'TCP is Connection-Oriented, reliable, uses 3-Way Handshake (SYN, SYN-ACK, ACK); UDP is Connectionless and unreliable (faster, used in streaming/DNS/DHCP).',
      'Default Port Numbers: HTTP (80), HTTPS (443), DNS (53), FTP (20/21), SMTP (25), SSH (22), DHCP (67/68).'
    ],
    detailedNotes: [
      {
        heading: '1. OSI 7 Layers & Layer Protocols',
        headingHindi: 'ओएसआई की 7 परतें और प्रोटोकॉल्स',
        content: 'Each layer provides services to the layer above it and consumes services from the layer below it. Presentation layer handles data encryption, compression, and translation (ASCII/JPEG/MPEG). Session layer manages dialog control and checkpoints.',
        points: [
          'Layer 7 (Application): Interface for users (HTTP, FTP, DNS)',
          'Layer 6 (Presentation): Encryption, Syntax & Encoding',
          'Layer 5 (Session): Dialog control, Checkpointing',
          'Layer 4 (Transport): End-to-end reliability, Flow control, Port addressing',
          'Layer 3 (Network): Logical IP addressing, Routing between subnets',
          'Layer 2 (Data Link): Framing, Physical MAC addressing, Error detection (CRC)',
          'Layer 1 (Physical): Transmission of raw bits over cables/radio'
        ]
      },
      {
        heading: '2. Subnetting & CIDR Calculation',
        headingHindi: 'सबनेटिंग और सीआईडीआर गणना',
        content: 'Classless Inter-Domain Routing (CIDR) notation /n specifies that the first n bits represent the network prefix, and the remaining (32 - n) bits represent host addresses.',
        points: [
          'Total IP addresses in /n subnet = 2^(32 - n)',
          'Usable Host addresses = 2^(32 - n) - 2 (subtract Network ID and Broadcast ID)',
          'Example /26: Host bits = 32 - 26 = 6. Total addresses = 2^6 = 64. Usable hosts = 62.'
        ]
      }
    ],
    definitions: [
      {
        term: 'Subnet Mask',
        termHindi: 'सबनेट मास्क (Subnet Mask)',
        definition: 'A 32-bit number used in IPv4 to distinguish between the network portion and the host portion of an IP address.',
        definitionHindi: 'एक 32-बिट संख्या जो आईपी एड्रेस के नेटवर्क भाग और होस्ट भाग को अलग करने के लिए उपयोग की जाती है।'
      },
      {
        term: 'ARP (Address Resolution Protocol)',
        termHindi: 'एआरपी प्रोटोकॉल',
        definition: 'A network protocol used to map a known dynamic IP address (32-bit) to a permanent physical MAC address (48-bit) on a local network.',
        definitionHindi: 'एक प्रोटोकॉल जो नेटवर्क पर ज्ञात आईपी पते को भौतिक मैक (MAC) पते में परिवर्तित करता है।'
      }
    ],
    formulas: [
      {
        title: 'Usable Hosts in a Subnet',
        formula: 'Usable Hosts = 2^(32 - Prefix) - 2',
        explanation: 'Two addresses are reserved: all 0s for Network Address, all 1s for Directed Broadcast Address.'
      }
    ],
    examples: [
      {
        title: 'Calculate usable hosts for 192.168.1.0/28',
        description: 'Host bits = 32 - 28 = 4 bits.',
        codeOrFormula: 'Usable hosts = 2^4 - 2 = 16 - 2 = 14 hosts.'
      }
    ],
    examPoints: [
      'HTTPS uses port 443; HTTP uses port 80; DNS uses port 53 (UDP predominantly).',
      'MAC address is 48 bits (6 octets); IPv4 is 32 bits; IPv6 is 128 bits.',
      'Router works at Network Layer (Layer 3); Switch works at Data Link Layer (Layer 2); Repeater/Hub works at Physical Layer (Layer 1).'
    ],
    mcqs: [MOCK_MCQS[3], MOCK_MCQS[10]],
    previewPages: [
      'OSI 7 Layers Complete Diagram with PDUs & Protocols',
      'IPv4 vs IPv6 Comparison & CIDR Subnetting Shortcut Matrix',
      'Key Protocols & Well-Known Port Numbers Table'
    ]
  },
  {
    id: 'note-session-09',
    sessionNumber: 9,
    title: 'Operating Systems & Process Scheduling',
    titleHindi: 'ऑपरेटिंग सिस्टम और प्रोसेस शेड्यूलिंग',
    category: 'Systems',
    totalPages: 24,
    fileSize: '3.3 MB',
    price: 1,
    isFree: false,
    coverBadge: 'Only ₹1',
    shortSummary: 'Process lifecycle, PCB, CPU scheduling algorithms with Gantt charts (FCFS, SJF, RR, Priority), Semaphores & Critical Section, Coffman Deadlock conditions, Banker\'s Algorithm, and Paging.',
    shortSummaryHindi: 'प्रोसेस जीवनचक्र, पीसीबी, सीपीयू शेड्यूलिंग एल्गोरिदम और गैंट चार्ट, सेमाफोर, डेडलॉक की शर्तें, बैंकर एल्गोरिदम और वर्चुअल मेमोरी पेजिंग।',
    shortNotes: [
      'Process States: New -> Ready -> Running -> Waiting/Blocked -> Terminated.',
      'Short-Term Scheduler (CPU Scheduler) selects which process from ready queue gets the CPU.',
      'Round Robin (RR) uses a time quantum. If time quantum is very large, RR degenerates into FCFS; if very small, context switching overhead degrades throughput.',
      'SJF (Shortest Job First) is provably optimal for minimizing Average Waiting Time, but non-preemptive SJF can cause starvation of long jobs.',
      'Critical Section Problem requires 3 conditions: Mutual Exclusion, Progress, and Bounded Waiting.',
      'Deadlock Necessary Conditions (Coffman): Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
      'Belady\'s Anomaly: An anomaly in FIFO page replacement where increasing the number of page frames INCREASES the number of page faults.'
    ],
    detailedNotes: [
      {
        heading: '1. CPU Scheduling Metrics & Gantt Chart Solving',
        headingHindi: 'सीपीयू शेड्यूलिंग मेट्रिक्स और गैंट चार्ट',
        content: 'Turnaround Time (TAT) = Completion Time - Arrival Time. Waiting Time (WT) = Turnaround Time - Burst Time. Response Time = Time of first response - Arrival Time.',
        points: [
          'FCFS (First Come First Serve): Non-preemptive, suffers from Convoy Effect',
          'SJF / SRTF: Shortest Remaining Time First is preemptive version of SJF',
          'Round Robin: Preemptive, time-sliced, ideal for interactive time-sharing systems'
        ]
      },
      {
        heading: '2. Deadlock Avoidance: Banker\'s Algorithm',
        headingHindi: 'डेडलॉक बचाव: बैंकर एल्गोरिदम',
        content: 'Banker\'s Algorithm simulates resource allocation to verify if the system remains in a "Safe State" where at least one safe sequence of processes can finish without deadlock.',
        points: [
          'Need Matrix = Max Demand - Currently Allocated',
          'A system in an unsafe state is NOT necessarily deadlocked, but can transition into deadlock',
          'Deadlock Prevention invalidates at least one of the 4 Coffman conditions'
        ]
      }
    ],
    definitions: [
      {
        term: 'Belady\'s Anomaly',
        termHindi: 'बेलेडी की विसंगति',
        definition: 'The phenomenon in which allocating more page frames to a process results in an INCREASE in the number of page faults (occurs in FIFO page replacement).',
        definitionHindi: 'पेजिंग की वह विसंगति जिसमें फ्रेम की संख्या बढ़ाने पर पेज फॉल्ट की संख्या कम होने के बजाय बढ़ जाती है (यह FIFO में होता है)।'
      },
      {
        term: 'Thrashing',
        termHindi: 'थ्रैशिंग',
        definition: 'A state where the operating system spends more time swapping pages in and out of virtual memory than executing actual instructions.',
        definitionHindi: 'वह स्थिति जब सीपीयू उपयोगी कार्य करने के बजाय अपना अधिकांश समय पेज स्वैपिंग में खर्च करता है।'
      }
    ],
    formulas: [
      {
        title: 'Turnaround Time & Waiting Time',
        formula: 'TAT = CT - AT  |  WT = TAT - BT',
        explanation: 'CT = Completion Time, AT = Arrival Time, BT = Burst Time.'
      }
    ],
    examples: [
      {
        title: 'Gantt Chart Turnaround Calculation',
        description: 'Process P1 arrives at 0 with burst 6; P2 arrives at 1 with burst 4. In FCFS:',
        codeOrFormula: 'P1 finishes at 6. TAT(P1) = 6 - 0 = 6. WT(P1) = 6 - 6 = 0. P2 finishes at 10. TAT(P2) = 10 - 1 = 9. WT(P2) = 9 - 4 = 5.'
      }
    ],
    examPoints: [
      'Which scheduling algorithm gives minimum average waiting time? SJF (Shortest Job First).',
      'Belady\'s Anomaly is observed in which page replacement algorithm? FIFO (First In First Out).',
      'Four necessary conditions for Deadlock must ALL hold simultaneously.'
    ],
    mcqs: [MOCK_MCQS[4]],
    previewPages: [
      'Process State Transition Diagram & PCB Structure',
      'CPU Scheduling Algorithms with Solved Gantt Chart Numericals',
      'Deadlock Detection, Prevention & Banker\'s Algorithm'
    ]
  }
];

export const FREE_RESOURCES = [
  {
    id: 'free-01',
    title: 'BPSC TRE 4.0 Official Computer Science Detailed Syllabus PDF',
    titleHindi: 'BPSC TRE 4.0 आधिकारिक कंप्यूटर साइंस विस्तृत सिलेबस',
    type: 'PDF Document',
    tag: 'Official Syllabus',
    description: 'Complete unit-wise syllabus mapped with NCERT Class 11-12 and previous question trends of TRE 1.0, 2.0 and 3.0.',
    pages: 14,
    size: '1.8 MB',
    downloadName: 'BPSC_TRE_4.0_CS_Official_Syllabus.pdf'
  },
  {
    id: 'free-02',
    title: 'Computer Fundamentals & Memory Hierarchy Revision Notes',
    titleHindi: 'कंप्यूटर फंडामेंटल्स और मेमोरी रिवीजन नोट्स',
    type: 'Free Study Note',
    tag: 'Session 01 Free',
    description: 'High-yield points, memory access time formulas, cache memory hierarchy, and 50 quick revision bullets.',
    pages: 18,
    size: '2.4 MB',
    downloadName: 'Session_01_Computer_Fundamentals_Free.pdf'
  },
  {
    id: 'free-03',
    title: 'BPSC TRE CS 50 High-Yield PYQ Golden Rules & Trap Guide',
    titleHindi: 'BPSC TRE CS 50 सबसे महत्वपूर्ण नियम और ट्रैप गाइड',
    type: 'Exam Cheat Sheet',
    tag: 'High Yield',
    description: 'Hand-picked rules that were asked in TRE 1.0, 2.0 & 3.0 including 2\'s complement traps, SQL HAVING conditions, and BST traversals.',
    pages: 8,
    size: '1.2 MB',
    downloadName: 'BPSC_TRE_CS_Golden_Rules.pdf'
  },
  {
    id: 'free-04',
    title: 'Free 25-Question Diagnostic Mock Test for BPSC TRE 4.0',
    titleHindi: 'निःशुल्क 25-प्रश्नों का डायग्नोस्टिक मॉक टेस्ट',
    type: 'Interactive Test',
    tag: 'Diagnostic Test',
    description: 'Assess your preparation level across all 8 syllabus units with instant scores, analysis, and bilingual explanations.',
    pages: 25,
    size: 'Online Quiz',
    isQuiz: true
  }
];

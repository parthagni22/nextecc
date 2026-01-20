export const courses = [
  {
    id: 'az-104',
    title: 'Microsoft Azure Administrator (AZ-104)',
    category: 'Cloud Computing',
    description: 'Learn to manage Azure subscriptions, secure identities, administer infrastructure, configure virtual networking, and more.',
    price: 299,
    rating: 4.8,
    instructor: 'Dr. Sarah Johnson',
    duration: '40 hours',
    level: 'Intermediate',
    curriculum: [
      {
        module: 'Module 1: Azure Administration',
        topics: [
          'Azure Active Directory',
          'Users and Groups Management',
          'Role-Based Access Control (RBAC)',
          'Azure Subscriptions and Governance'
        ]
      },
      {
        module: 'Module 2: Virtual Machines',
        topics: [
          'Creating and Configuring VMs',
          'VM Availability and Scalability',
          'VM Backup and Recovery',
          'Monitoring VM Performance'
        ]
      },
      {
        module: 'Module 3: Storage Solutions',
        topics: [
          'Storage Accounts',
          'Blob Storage',
          'Azure Files',
          'Storage Security'
        ]
      },
      {
        module: 'Module 4: Virtual Networking',
        topics: [
          'Virtual Networks and Subnets',
          'Network Security Groups',
          'VPN Gateway',
          'Azure DNS'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-02-01', time: '10:00 AM', topic: 'Introduction to Azure Administration' },
      { date: '2026-02-08', time: '10:00 AM', topic: 'Managing Azure Active Directory' },
      { date: '2026-02-15', time: '10:00 AM', topic: 'Virtual Machines Deployment' },
      { date: '2026-02-22', time: '10:00 AM', topic: 'Storage Solutions Deep Dive' }
    ]
  },
  {
    id: 'm365-fundamentals',
    title: 'Microsoft 365 Fundamentals',
    category: 'Productivity',
    description: 'Understand Microsoft 365 services, cloud concepts, security, compliance, privacy, and pricing.',
    price: 199,
    rating: 4.7,
    instructor: 'Michael Chen',
    duration: '25 hours',
    level: 'Beginner',
    curriculum: [
      {
        module: 'Module 1: Microsoft 365 Overview',
        topics: [
          'Cloud Services Fundamentals',
          'Microsoft 365 Services',
          'Collaboration Tools',
          'Productivity Applications'
        ]
      },
      {
        module: 'Module 2: Security and Compliance',
        topics: [
          'Identity and Access Management',
          'Threat Protection',
          'Information Protection',
          'Compliance Management'
        ]
      },
      {
        module: 'Module 3: Microsoft 365 Pricing',
        topics: [
          'Licensing Models',
          'Subscription Options',
          'Cost Management',
          'Billing and Payment'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-02-03', time: '2:00 PM', topic: 'Introduction to Microsoft 365' },
      { date: '2026-02-10', time: '2:00 PM', topic: 'Security Features Overview' },
      { date: '2026-02-17', time: '2:00 PM', topic: 'Licensing and Pricing' }
    ]
  },
  {
    id: 'az-900',
    title: 'Azure Fundamentals (AZ-900)',
    category: 'Cloud Computing',
    description: 'Build foundational knowledge of cloud services and how Azure provides those services.',
    price: 149,
    rating: 4.9,
    instructor: 'Jennifer Williams',
    duration: '20 hours',
    level: 'Beginner',
    curriculum: [
      {
        module: 'Module 1: Cloud Concepts',
        topics: [
          'What is Cloud Computing',
          'Benefits of Cloud Services',
          'Cloud Service Types (IaaS, PaaS, SaaS)',
          'Cloud Deployment Models'
        ]
      },
      {
        module: 'Module 2: Core Azure Services',
        topics: [
          'Azure Compute Services',
          'Azure Storage Services',
          'Azure Networking Services',
          'Azure Database Services'
        ]
      },
      {
        module: 'Module 3: Security and Compliance',
        topics: [
          'Azure Security Tools',
          'Network Security',
          'Identity Services',
          'Governance and Compliance'
        ]
      },
      {
        module: 'Module 4: Azure Pricing and Support',
        topics: [
          'Azure Subscriptions',
          'Cost Management',
          'Azure Support Options',
          'Service Level Agreements'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-02-05', time: '11:00 AM', topic: 'Introduction to Cloud Computing' },
      { date: '2026-02-12', time: '11:00 AM', topic: 'Azure Core Services' },
      { date: '2026-02-19', time: '11:00 AM', topic: 'Security and Compliance' },
      { date: '2026-02-26', time: '11:00 AM', topic: 'Pricing and Support' }
    ]
  },
  {
    id: 'power-bi',
    title: 'Power BI Data Analyst',
    category: 'Data Analytics',
    description: 'Learn to prepare data, model data, visualize data, and analyze data using Power BI.',
    price: 349,
    rating: 4.8,
    instructor: 'Robert Martinez',
    duration: '45 hours',
    level: 'Intermediate',
    curriculum: [
      {
        module: 'Module 1: Getting Started',
        topics: [
          'Power BI Overview',
          'Data Sources and Connections',
          'Power Query Basics',
          'Data Transformation'
        ]
      },
      {
        module: 'Module 2: Data Modeling',
        topics: [
          'Relationships and Cardinality',
          'DAX Fundamentals',
          'Calculated Columns and Measures',
          'Time Intelligence'
        ]
      },
      {
        module: 'Module 3: Visualizations',
        topics: [
          'Visual Types',
          'Custom Visuals',
          'Report Design Best Practices',
          'Interactive Reports'
        ]
      },
      {
        module: 'Module 4: Advanced Analytics',
        topics: [
          'Statistical Analysis',
          'Forecasting',
          'What-If Parameters',
          'Performance Optimization'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-02-04', time: '3:00 PM', topic: 'Introduction to Power BI' },
      { date: '2026-02-11', time: '3:00 PM', topic: 'Data Modeling Essentials' },
      { date: '2026-02-18', time: '3:00 PM', topic: 'Creating Visualizations' },
      { date: '2026-02-25', time: '3:00 PM', topic: 'Advanced Analytics' }
    ]
  },
  {
    id: 'azure-data-engineer',
    title: 'Azure Data Engineer',
    category: 'Data Engineering',
    description: 'Design and implement data management, monitoring, security, and privacy using Azure data services.',
    price: 399,
    rating: 4.7,
    instructor: 'Dr. Amanda Lee',
    duration: '50 hours',
    level: 'Advanced',
    curriculum: [
      {
        module: 'Module 1: Data Storage',
        topics: [
          'Azure Data Lake Storage',
          'Azure SQL Database',
          'Cosmos DB',
          'Data Warehouse Solutions'
        ]
      },
      {
        module: 'Module 2: Data Processing',
        topics: [
          'Azure Data Factory',
          'Azure Databricks',
          'Azure Synapse Analytics',
          'Stream Analytics'
        ]
      },
      {
        module: 'Module 3: Data Security',
        topics: [
          'Data Encryption',
          'Access Control',
          'Compliance',
          'Monitoring and Auditing'
        ]
      },
      {
        module: 'Module 4: Optimization',
        topics: [
          'Performance Tuning',
          'Cost Optimization',
          'Disaster Recovery',
          'Best Practices'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-02-06', time: '1:00 PM', topic: 'Data Storage Solutions' },
      { date: '2026-02-13', time: '1:00 PM', topic: 'ETL with Data Factory' },
      { date: '2026-02-20', time: '1:00 PM', topic: 'Security Implementation' },
      { date: '2026-02-27', time: '1:00 PM', topic: 'Performance Optimization' }
    ]
  },
  {
    id: 'sc-900',
    title: 'Microsoft Security, Compliance (SC-900)',
    category: 'Security',
    description: 'Learn the fundamentals of security, compliance, and identity across cloud-based and related Microsoft services.',
    price: 249,
    rating: 4.6,
    instructor: 'David Thompson',
    duration: '30 hours',
    level: 'Beginner',
    curriculum: [
      {
        module: 'Module 1: Security Concepts',
        topics: [
          'Shared Responsibility Model',
          'Defense in Depth',
          'Zero Trust Model',
          'Encryption and Hashing'
        ]
      },
      {
        module: 'Module 2: Identity and Access',
        topics: [
          'Authentication vs Authorization',
          'Azure Active Directory',
          'Multi-Factor Authentication',
          'Conditional Access'
        ]
      },
      {
        module: 'Module 3: Compliance',
        topics: [
          'Compliance Offerings',
          'Privacy Principles',
          'Data Residency',
          'Compliance Manager'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-02-07', time: '9:00 AM', topic: 'Security Fundamentals' },
      { date: '2026-02-14', time: '9:00 AM', topic: 'Identity Management' },
      { date: '2026-02-21', time: '9:00 AM', topic: 'Compliance Overview' }
    ]
  },
  {
    id: 'azure-ai',
    title: 'Azure AI Fundamentals',
    category: 'Artificial Intelligence',
    description: 'Explore fundamental AI concepts and Azure services for creating AI solutions.',
    price: 279,
    rating: 4.9,
    instructor: 'Dr. Emily Rodriguez',
    duration: '35 hours',
    level: 'Intermediate',
    curriculum: [
      {
        module: 'Module 1: AI Concepts',
        topics: [
          'Machine Learning Basics',
          'Types of Machine Learning',
          'AI Workloads',
          'Responsible AI'
        ]
      },
      {
        module: 'Module 2: Computer Vision',
        topics: [
          'Image Classification',
          'Object Detection',
          'Facial Recognition',
          'Custom Vision Service'
        ]
      },
      {
        module: 'Module 3: Natural Language Processing',
        topics: [
          'Text Analytics',
          'Language Understanding (LUIS)',
          'Speech Services',
          'Translation Services'
        ]
      },
      {
        module: 'Module 4: Conversational AI',
        topics: [
          'Bot Framework',
          'QnA Maker',
          'Azure Bot Service',
          'Chatbot Best Practices'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-02-02', time: '4:00 PM', topic: 'Introduction to AI' },
      { date: '2026-02-09', time: '4:00 PM', topic: 'Computer Vision Services' },
      { date: '2026-02-16', time: '4:00 PM', topic: 'NLP and Text Analytics' },
      { date: '2026-02-23', time: '4:00 PM', topic: 'Building Chatbots' }
    ]
  },
  {
    id: 'm365-workforce',
    title: 'Microsoft 365 Workforce Enablement (Faculty & Staff)',
    category: 'Productivity & Collaboration',
    description: 'Comprehensive Microsoft 365 training program designed for educational institutions. Master Teams, OneDrive, SharePoint, Excel, Outlook, PowerPoint, and automation tools to enhance productivity and collaboration.',
    price: 499,
    rating: 4.9,
    instructor: 'Nextec Training Team',
    duration: '60 hours',
    level: 'All Levels',
    requiresAssessment: true,
    curriculum: [
      {
        module: 'Phase 1: Core Collaboration & File Management',
        topics: [
          'Microsoft Teams Essentials (role-based workflows)',
          'OneDrive Sharing, Versioning & Permissions',
          'SharePoint Foundations (when to use vs OneDrive)',
          'Team collaboration best practices'
        ]
      },
      {
        module: 'Phase 2: Productivity & Reporting',
        topics: [
          'Excel Fundamentals & Intermediate',
          'Outlook Efficiency (calendar, rules, delegation)',
          'PowerPoint + Accessibility (templates, readable design)',
          'Data analysis and reporting'
        ]
      },
      {
        module: 'Phase 3: Automation & Modern Workflow',
        topics: [
          'Power Automate for Everyday Tasks',
          'Power BI Basics (analytics enablement)',
          'Workflow optimization',
          'Process automation'
        ]
      },
      {
        module: 'Phase 4: Best Practices & Governance',
        topics: [
          'File governance and version control',
          'Security and compliance basics',
          'Accessibility standards',
          'Organizational productivity strategies'
        ]
      }
    ],
    upcomingClasses: [
      { date: '2026-03-01', time: '9:00 AM', topic: 'Microsoft Teams Essentials - Part 1' },
      { date: '2026-03-08', time: '9:00 AM', topic: 'OneDrive & SharePoint Fundamentals' },
      { date: '2026-03-15', time: '9:00 AM', topic: 'Excel for Data Analysis' },
      { date: '2026-03-22', time: '9:00 AM', topic: 'Outlook & PowerPoint Mastery' },
      { date: '2026-03-29', time: '9:00 AM', topic: 'Power Automate Introduction' },
      { date: '2026-04-05', time: '9:00 AM', topic: 'Power BI Basics' },
      { date: '2026-04-12', time: '9:00 AM', topic: 'Best Practices & Governance' },
      { date: '2026-04-19', time: '9:00 AM', topic: 'Final Review & Q&A' }
    ]
  }
];

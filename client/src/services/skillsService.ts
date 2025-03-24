// Common professional skills dictionary
export const skillsDictionary = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Go', 'Rust',
  'SQL', 'HTML', 'CSS', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell Scripting',

  // Web Development
  'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Ruby on Rails',
  'Spring Boot', 'ASP.NET', 'Laravel', 'WordPress', 'GraphQL', 'REST API', 'WebSocket',

  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQL Server', 'Firebase', 'Elasticsearch',
  'DynamoDB', 'Cassandra', 'Neo4j', 'MariaDB', 'SQLite',

  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions',
  'Terraform', 'Ansible', 'Puppet', 'Chef', 'CircleCI', 'Travis CI',

  // Tools & Version Control
  'Git', 'SVN', 'Mercurial', 'JIRA', 'Confluence', 'Trello', 'Slack', 'Microsoft Teams',
  'Visual Studio Code', 'IntelliJ IDEA', 'Eclipse', 'Postman',

  // Testing
  'Jest', 'Mocha', 'Cypress', 'Selenium', 'JUnit', 'TestNG', 'PyTest', 'RSpec',
  'PHPUnit', 'XCTest', 'Jasmine', 'Karma',

  // Methodologies & Practices
  'Agile', 'Scrum', 'Kanban', 'TDD', 'BDD', 'CI/CD', 'DevOps', 'Microservices',
  'RESTful Architecture', 'Design Patterns', 'Object-Oriented Programming',

  // Data Science & AI
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn',
  'Data Analysis', 'Natural Language Processing', 'Computer Vision', 'Neural Networks',

  // Mobile Development
  'iOS Development', 'Android Development', 'React Native', 'Flutter', 'Xamarin',
  'Mobile App Testing', 'App Store Optimization', 'Mobile UI Design',

  // UI/UX & Design
  'UI Design', 'UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
  'InDesign', 'Responsive Design', 'Web Accessibility', 'Material Design',

  // Soft Skills
  'Problem Solving', 'Team Leadership', 'Communication', 'Project Management',
  'Time Management', 'Critical Thinking', 'Collaboration', 'Adaptability',

  // Security
  'Cybersecurity', 'Penetration Testing', 'Security Auditing', 'Encryption',
  'OAuth', 'JWT', 'SSL/TLS', 'Vulnerability Assessment',

  // Analytics & SEO
  'Google Analytics', 'SEO', 'Web Analytics', 'A/B Testing', 'Content Marketing',
  'Digital Marketing', 'Social Media Marketing', 'Email Marketing',

  // Performance & Optimization
  'Performance Optimization', 'Code Optimization', 'Database Optimization',
  'Web Performance', 'Caching Strategies', 'Load Balancing'
];

export const getSuggestions = (input: string): string[] => {
  const inputLower = input.toLowerCase();
  return skillsDictionary
    .filter(skill => skill.toLowerCase().includes(inputLower))
    .slice(0, 5); // Limit to 5 suggestions
};
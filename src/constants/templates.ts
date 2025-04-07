export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/template-images/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software development proposal",
    imageUrl: "/template-images/software-proposal.svg",
    initialContent: `
     <h1>Software Project Proposal</h1>

  <h2>1. Project Title</h2>
  <p><em>Enter your project title here</em></p>

  <h2>2. Introduction</h2>
  <p>
    This proposal outlines the development of a software solution to address [problem statement or opportunity]. The goal is to provide an efficient, scalable, and user-friendly application that fulfills the identified needs.
  </p>

  <h2>3. Objectives</h2>
  <ul>
    <li>Define the problem and scope of the software</li>
    <li>Provide a robust architecture and design</li>
    <li>Develop key features and functionalities</li>
    <li>Ensure quality through testing and feedback</li>
  </ul>

  <h2>4. Target Audience</h2>
  <p>
    The primary users of this software will be [describe user group, e.g., students, businesses, developers, etc.]. The application aims to improve [specific outcomes or workflows].
  </p>

  <h2>5. Technologies Used</h2>
  <ul>
    <li>Frontend: HTML, CSS, JavaScript, [React/Vue/etc.]</li>
    <li>Backend: Node.js, Python, [Express/Django/etc.]</li>
    <li>Database: MongoDB, MySQL, or PostgreSQL</li>
    <li>Hosting: [Heroku, Vercel, AWS, etc.]</li>
  </ul>

  <h2>6. Timeline</h2>
  <table border="1" cellpadding="5">
    <thead>
      <tr>
        <th>Phase</th>
        <th>Duration</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Planning</td>
        <td>1 Week</td>
        <td>Gather requirements, finalize scope</td>
      </tr>
      <tr>
        <td>Development</td>
        <td>3 Weeks</td>
        <td>Implement core features and UI</td>
      </tr>
      <tr>
        <td>Testing</td>
        <td>1 Week</td>
        <td>Fix bugs and ensure stability</td>
      </tr>
      <tr>
        <td>Deployment</td>
        <td>1 Week</td>
        <td>Deploy to production and monitor</td>
      </tr>
    </tbody>
  </table>

  <h2>7. Budget (Optional)</h2>
  <p>
    Estimated cost breakdown, including development, hosting, and maintenance if applicable.
  </p>

  <h2>8. Conclusion</h2>
  <p>
    This project aims to deliver a high-quality software solution that meets the outlined objectives. We are confident in its success and welcome feedback and collaboration.
  </p>

  <p><strong>Prepared by:</strong> [Your Name / Team Name]</p>
  <p><strong>Date:</strong> [MM/DD/YYYY]</p>
     `,
  },
  {
    id: "project-proposal",
    label: "Project proposal",
    imageUrl: "/template-images/project-proposal.svg",
    initialContent: `
    <h1 style="text-align: center;">Software Project Proposal</h1>

  <h2>1. Project Title</h2>
  <p><strong>Project Name:</strong> <em>Smart Task Manager</em></p>

  <h2>2. Project Overview</h2>
  <p>
    The Smart Task Manager is a web-based application aimed at helping individuals and teams manage their daily tasks and projects efficiently. The system will include features like task creation, assignment, progress tracking, deadlines, and notifications.
  </p>

  <h2>3. Problem Statement</h2>
  <p>
    Many individuals and small teams struggle with organizing and prioritizing tasks, especially when working remotely. Existing tools are often too complex or lack collaboration features suitable for smaller groups.
  </p>

  <h2>4. Objectives</h2>
  <ul>
    <li>Develop a simple and intuitive task management tool</li>
    <li>Enable real-time collaboration between users</li>
    <li>Integrate notifications and reminders</li>
    <li>Allow customizable project boards</li>
  </ul>

  <h2>5. Project Scope</h2>
  <p>
    The project includes the design, development, testing, and deployment of the Smart Task Manager platform. Features such as user authentication, real-time updates, and cloud storage will be implemented.
  </p>

  <h2>6. Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js, Tailwind CSS</li>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB</li>
    <li><strong>Authentication:</strong> Firebase Auth</li>
    <li><strong>Hosting:</strong> Vercel / Render</li>
  </ul>

  <h2>7. Timeline</h2>
  <table border="1" cellpadding="5" cellspacing="0">
    <thead>
      <tr>
        <th>Phase</th>
        <th>Duration</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Planning & Requirements</td>
        <td>Week 1</td>
        <td>Gather requirements, design wireframes</td>
      </tr>
      <tr>
        <td>Development</td>
        <td>Weeks 2 - 4</td>
        <td>Build core features (tasks, users, boards)</td>
      </tr>
      <tr>
        <td>Testing</td>
        <td>Week 5</td>
        <td>Test application and fix bugs</td>
      </tr>
      <tr>
        <td>Deployment & Documentation</td>
        <td>Week 6</td>
        <td>Deploy final version, write user manual</td>
      </tr>
    </tbody>
  </table>

  <h2>8. Expected Outcome</h2>
  <p>
    By the end of the project, we will deliver a fully functional task management application with collaborative features, intuitive UI, and stable backend performance.
  </p>

  <h2>9. Team Members</h2>
  <ul>
    <li>John Doe - Frontend Developer</li>
    <li>Jane Smith - Backend Developer</li>
    <li>Alex Kim - QA & Documentation</li>
  </ul>

  <h2>10. Conclusion</h2>
  <p>
    This proposal outlines the plan for building a simple yet effective task management tool that supports productivity and collaboration. The team is committed to completing this project on time and delivering high-quality software.
  </p>

  <p><strong>Date:</strong> April 7, 2025</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business letter",
    imageUrl: "/template-images/business-letter.svg",
    initialContent: `
    <p>

    <strong>Your Name</strong><br>
    <p>
    Your Position
    </p>

    <p>
    Your Company Name
    </p>
<>
    Street Address<br>
    </>
    
    City, State ZIP Code<br>
    Email: your.email@example.com<br>
    Phone: (123) 456-7890
  </p>

  <p>
    <strong>Date:</strong> April 7, 2025
  </p>

  <p>
    <strong>Recipient Name</strong><br>
    Recipient Position<br>
    Company Name<br>
    Street Address<br>
    City, State ZIP Code
  </p>

  <p>Dear [Recipient’s Name],</p>

  <p>
    I am writing to [state the purpose of the letter—e.g., introduce a product/service, follow up on a meeting, request information, etc.]. We at [Your Company Name] have been working diligently on [brief description of your project, product, or proposal].
  </p>

  <p>
    [Provide supporting details. For example, outline benefits, provide background, or discuss a proposal.]
  </p>

  <p>
    We would appreciate the opportunity to discuss this further. Please feel free to contact me at your convenience to schedule a meeting or call.
  </p>

  <p>
    Thank you for your time and consideration. I look forward to your response.
  </p>

  <p>Sincerely,</p>

  <p>
    <strong>Your Full Name</strong><br>
    Your Position<br>
    Your Company Name
  </p>`,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/template-images/resume.svg",
    initialContent: `<h1 style="text-align: center; margin-bottom: 5px;">John Doe</h1>
  <p style="text-align: center; margin-top: 0;">
    Email: john.doe@example.com | Phone: (123) 456-7890 | Location: City, Country<br>
    LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe
  </p>

  <hr>

  <h2>Objective</h2>
  <p>
    A highly motivated software engineering student seeking an internship/full-time role where I can apply my skills in web development, problem-solving, and teamwork to contribute to real-world projects.
  </p>

  <h2>Education</h2>
  <p>
    <strong>University Name</strong> — Bachelor of Technology in Computer Science<br>
    Aug 2021 – May 2025<br>
    CGPA: 8.5/10
  </p>

  <h2>Skills</h2>
  <ul>
    <li><strong>Languages:</strong> JavaScript, Python, C++, HTML, CSS</li>
    <li><strong>Web:</strong> React.js, Node.js, Express, MongoDB, Tailwind CSS</li>
    <li><strong>Tools:</strong> Git, GitHub, VS Code, Figma</li>
  </ul>

  <h2>Projects</h2>
  <p>
    <strong>Google Docs Clone</strong><br>
    Built a real-time collaborative document editor with rich text formatting, template support, and autosave using Firebase and React.
  </p>
  <p>
    <strong>AI Blog Platform</strong><br>
    Developed a blogging platform that generates content using GPT APIs, supports Markdown, user auth, and rich search filtering.
  </p>

  <h2>Experience</h2>
  <p>
    <strong>Web Developer Intern</strong> — XYZ Solutions<br>
    June 2024 – Aug 2024<br>
    - Built internal dashboard using React and Chart.js<br>
    - Improved page load time by 40% through code optimization
  </p>

  <h2>Certifications</h2>
  <ul>
    <li>Full Stack Web Development — Coursera</li>
    <li>Python for Data Science — IBM</li>
  </ul>

  <h2>Achievements</h2>
  <ul>
    <li>Top 10% in HackerRank Coding Contest</li>
    <li>2nd Place in College Hackathon 2023</li>
  </ul>

  <h2>Languages</h2>
  <p>English (Fluent), Hindi (Native)</p>

  <h2>Declaration</h2>
  <p>I hereby declare that the information provided above is true to the best of my knowledge.</p>

  <p style="margin-top: 40px;">Date: April 7, 2025<br>Place: City Name</p>`,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/template-images/cover-letter.svg",
    initialContent: ` <p>
    <strong>John Doe</strong><br>
    City, State, ZIP Code<br>
    john.doe@example.com<br>
    (123) 456-7890
  </p>

  <p><strong>Date:</strong> April 7, 2025</p>

  <p>
    <strong>Hiring Manager</strong><br>
    Company Name<br>
    Company Address<br>
    City, State, ZIP Code
  </p>

  <p>Dear Hiring Manager,</p>

  <p>
    I am writing to express my interest in the [Position Title] role at [Company Name], as advertised. With a strong background in [Your Major/Field], hands-on experience in [Relevant Technologies/Skills], and a passion for building impactful software solutions, I am confident in my ability to contribute effectively to your team.
  </p>

  <p>
    As a [Your Year, e.g., "final-year"] Computer Science student at [University Name], I have developed solid skills in web development using React, Node.js, and MongoDB. In my recent project, a Google Docs clone, I implemented real-time document collaboration, user authentication, and template management using Firebase — showcasing both technical knowledge and attention to user experience.
  </p>

  <p>
    What excites me most about this opportunity is [mention something specific about the company or role that interests you]. I am particularly impressed by your team’s focus on [mention value, mission, or product], and I believe my skills and enthusiasm would be a great match.
  </p>

  <p>
    I would welcome the chance to discuss how I can contribute to [Company Name]. Please find my resume attached. I am available at your convenience for an interview and can be reached at (123) 456-7890 or via email at john.doe@example.com.
  </p>

  <p>Thank you for considering my application.</p>

  <p>Sincerely,  
    <br><strong>John Doe</strong>
  </p>`,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/template-images/letter.svg",
    initialContent: ` <p>
    Your Name<br>
    Your Address<br>
    City, State ZIP Code<br>
    Email: your.email@example.com<br>
    Phone: (123) 456-7890
  </p>

  <p><strong>Date:</strong> April 7, 2025</p>

  <p>
    Recipient's Name<br>
    Recipient's Address<br>
    City, State ZIP Code
  </p>

  <p>Dear [Recipient's Name],</p>

  <p>
    I hope this letter finds you well. I am writing to [state the reason or purpose for writing this letter in one or two sentences]. 
  </p>

  <p>
    [Elaborate on your purpose. You can include background information, specific details, or requests. Keep the tone formal or friendly depending on the use-case.]
  </p>

  <p>
    Please feel free to reach out to me if you have any questions or need further clarification. I look forward to hearing from you.
  </p>

  <p>
    Thank you for your time and consideration.
  </p>

  <p>Sincerely,<br><br>
    <strong>Your Name</strong>
  </p>`,
  },
];

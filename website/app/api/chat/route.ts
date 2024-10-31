import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const resume = `# Luke Cheng 
## SUMMARY	
A results-oriented scientist transitioning into software development, with a strong foundation in information science, chemistry, and philosophy. Proven track record of developing innovative solutions, including an AI-powered personal website, a treatment evaluation tool for UPMC, and award-winning game development. Experienced in full-stack development, UX research, and AI-driven projects, with expertise in React, Java, Python, and cloud services like AWS, Azure, and Google Cloud. Skilled at translating complex ideas into practical applications, collaborating cross-functionally, and continuously learning cutting-edge technologies. Passionate about leveraging technology for impactful, real-world problem-solving
## EDUCATIONS	
### M.S. in Information Science | University of Pittsburgh | GPA 3.8 	08/2022 - 05/2024
- Relevant Courses: algorithms, data structures, database, interactive system design, machine learning, network, cryptography

### B.S. in Chemistry and Philosophy | Virginia Tech 	08/2016 - 12/2020
- Relevant Courses: Software Design, Java, Ethics & AI

## EXPERIENCE	
### Part-time Research Developer | University of Pittsburgh Medical Center	02/2023 - 10/2023
- Collaborated with the Bioinformatics department to design and develop an internal platform that allows physicians to search and analyze similar patient cases and treatment outcomes, improving decision-making for medication use and care plans.
- Conducted UX research among medical professionals and students, ensuring the platform supported real-world clinical workflows and enabled the review of historical treatment records and patient feedback for more informed future interventions.
- Led the design of a responsive interface using Figma and React.js, seamlessly integrating with UPMC's database while ensuring compliance with FHIR standards for secure and standardized patient data exchange.

### Research Scientist | ChemPacific Corp, Baltimore, MD 	05/2021 - 05/2022
- Created automation for data cleansing processes and optimized chemical instrument procedures, igniting my passion for software development.
- Optimized GMP procedures and automated chemical testing workflows using Agilent systems, reducing daily workload by 30 minutes, streamlining processes, and minimizing machine idle time.
- Collaborated with QA and international regulatory bodies (NMPA) to align production with global compliance standards.
- Translated complex synthesis processes into clear, actionable production guidelines for overseas mass-production subsidiaries, ensuring smooth knowledge transfer, quality consistency, and seamless cross-border collaboration.

## PROJECTS	
### AI-Powered Personal Website | React, Azure, Google Gemini | lujia-cheng.github.io
- Developed a personal website with a Gemini-based AI chatbot fine-tuned on my resume, projects, and career goals.
- Implemented a React frontend and utilized Azure Function App to deploy serverless backend services.
- Automated CI/CD workflows using GitHub Actions for testing, building, and deployment.
- Integrated Azure Monitor for tracking visitor behavior and monitoring system health, providing insights into performance optimization.
### Small-Form-Factor PC Checker | Vercel, Next.js, Google Cloud | Project Overview (github.com)
- Submission for the Google Gemini API Developer Competition (currently in the voting phase).
- Developed a Next.js web app with a Chrome extension to assess PC parts compatibility for small-form-factor (SFF) cases using AI-powered documentation analysis, addressing limitations of existing tools like PCPartPicker.com.
- Leveraged Next.js for server-side rendering, enhancing performance and SEO for better user engagement.
- Utilized Google Custom Search services to fetch case manuals and component specifications, providing accurate insights for SFF builds.
### Full-stack E-Commerce Website | MongoDB, Express, React, Node.js | Interactive Demo (glitch.com)
- Built a MERN stack e-commerce platform with product search, shopping cart, and user management features.
- Bypassed Glitch.com’s limited CI/CD workflow by developing custom Python and shell scripts, leveraging Linux-based VMs for full automation.
- Used Docker Compose for consistent local development environments and seamless deployment.
- Integrated automated tests and logging to ensure system stability during peak usage.
### Android Morse Code Keyboard | android, Java, Kotlin, Jetpack Compose | Illustrated Demo (github.com)
- Developed an Android Input Method Editor (IME) designed to facilitate intuitive Morse code learning.
- Designed tying and setting interface using XML Jetpack Compose, ensuring ease of use and accessibility for learners of all levels.
- Employed haptic feedback to create a multi-sensory interaction, allowing users to feel Morse code patterns while typing, thereby reinforcing pattern recognition and enhancing the learning experience.
### Creative Python Project: Image to Staggered Brick Walls | Python | Illustrated Demo (github.com)
- A creative project that utilized Python packages (NumPy, scikit-image, scikit-learn) to generate color palettes from images and visually construct brick walls using the extracted colors.
### Bon Voyage | C#, Unity | Interactive Demo (github.com)
- Awarded the First Penguin Award at the 2023 Games4SocialImpact jam for a game exploring themes of “age” through a third-person adventure.
- Leveraged C# and Unity expertise to rapidly develop the game within a two-day period, demonstrating technical proficiency and adaptability.
- Set up Git version control for team collaboration, managing conflict resolution for underperforming teammates.
- Automated publishing workflows to itch.io using Python scripts, ensuring smooth deployment and versioning during rapid development.
### Twofish Encryption in Java & Misc. Cryptography | Java | Project Overview (github.com)
- Implemented the Twofish encryption algorithm in Java, demonstrating a strong understanding of cryptographic principles.
### PPG Color Sales Machine learning | R, Python
- Developed machine learning models to predict paint sales demand based on a comprehensive dataset provided by PPG Industries.
- Applied data mining and feature engineering techniques to uncover key features affecting consumer preferences.
- Deployed the model using Python for predictive analysis, directly contributing to business decision-making and inventory planning.
- Gained firsthand experience in the full machine learning lifecycle, from prototype development to production and model refinement.
### CUDA Learning & Experimentation | CUDA, C++
- Actively learning and experimenting with CUDA C++ for parallel programming, applying it to projects such as matrix operations and image filtering.
### Screeps Doc/API Translation | Git, GitHub Action | Organization Repo (github.com)
- Led an open-source initiative to translate Screeps API documentation into Chinese (zh-CN), improving accessibility for non-English-speaking developers.
- Automated CI/CD workflows with GitHub Actions to validate translations and publish updated documentation, minimizing manual intervention.
- Coordinated contributors across time zones, managing version control to ensure high-quality collaborative work.
_
## LEADERSHIP & ACTIVITIES 	
- Led the University of Pittsburgh's delegation (CyberPanther1) to the CyberForce competition, spearheading a rapid response to sabotage during the 8-hour competition. Rebuilt the React frontend, migrated systems to a secure Linux-based virtual machine, and actively defended the infrastructure. Additionally, mentored our sibling team, contributing to an improved overall college ranking.
- Stabilized leadership transitions during the COVID-19 lockdown as Treasurer of the Virginia Tech Parkour Club, managing finances and securing a 40% discount with a local gym.
- Recognized with the First Penguin Award at Games4SocialImpact 2023 (University of Pittsburgh) game jam for developing "Bon Voyage", an innovative third-person exploration game focused on the theme of "age".
- Founded and maintaining Screeps China (github.com), a doc/API translation project that expanded access to hundreds of Chinese-speaking developers by translating essential documentation and APIs.
`;

const systemPrompt = `You're an assistant of a personal website. You'll be talking to a visitor and potential recruiter. Try to keep the response concise and professional. Below is the website owner's resume: \n\nResume:\n${resume}`;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: systemPrompt,
});

// OPTIONS request handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// POST request handler
export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  if (!message) {
    return new NextResponse("No message", { status: 400 });
  }

  // Start the chat with formatted history
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hi" }],
      },
      ...history.map((msg: { role: string; text: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text || "" }],
      })),
    ],
  });

  const result = await chat.sendMessage(message);

  return new NextResponse(
    JSON.stringify({
      message: result?.response?.text() || "No response from model",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
    }
  );
}

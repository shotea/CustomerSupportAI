### Customer Support AI App

## Welcome to the Customer Support AI App! This application enhances customer service by providing intelligent, automated responses to common queries. It integrates seamlessly with your existing support platforms to improve efficiency and customer satisfaction.

### Features
Automated Responses: AI-powered responses to frequent customer questions.
Seamless Integration: Connects with various customer support platforms.
Real-time Updates: Continuous improvement of response accuracy through machine learning.
Multi-Channel Support: Manage inquiries from multiple channels, including chat, email, and social media.
Analytics Dashboard: Insightful metrics on customer interactions and AI performance.
Dark Mode: Switch between light and dark modes for a comfortable user experience.

### Getting Started

Prerequisites
Node.js (version 14 or higher)
OpenAI API Key
Firebase account (optional, for additional customer data storage)
 
### Installation

## Clone the repository:

bash
Copy code
git clone https://github.com/your-username/customer-support-ai-app.git
cd customer-support-ai-app
Install dependencies:

bash
Copy code
npm install
Configure the AI API:

Create a file named openai.js in the src/config directory and add your OpenAI API key:

javascript
Copy code
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
Run the application:

bash
Copy code
npm run dev
Open your browser:

Navigate to http://localhost:3000 to start using the app.

### Usage
Send a Message:

Type your message into the input field and press Enter or click "Send".
View Responses:

The AI will provide responses to your queries based on its training data.
Analytics:

Access the dashboard to view performance metrics and insights.
Toggle Dark Mode:

Use the Dark Mode switch to toggle between light and dark themes.

### Skills Used

JavaScript 
React Next.js 
Material-UI 
Postman
OpenAI API


Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

https://cuetomersupportai-git-main-gio-s-projects.vercel.app/

![image](https://github.com/user-attachments/assets/bec8c3b5-65b5-43fa-aa9d-35bdc901a74a)


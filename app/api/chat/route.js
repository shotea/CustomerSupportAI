// Importing the NextResponse object from the next/server module
// NextResponse is used to create and manipulate HTTP responses in Next.js API routes
import { NextResponse } from "next/server";

// Importing the OpenAI library
// OpenAI is a library to interact with OpenAI's API for generating responses using AI models and tools
import OpenAI from 'openai';

// Define the system prompt to instruct the AI on how to behave
const systemPrompt = `You are an AI-powered customer support assistant for HeadStartAI, a platform that provides AI-driven interviews for software engineering positions.
1. HeadStart offers AI-powered interviews for software engineering positions.
2. Our platform helps candidates practice and prepare for real job interviews.
3. We cover a wide range of topics including algorithms, data structures, systems design, and behavioral questions.
4. Users can access our services through our website or mobile app.
5. If asked about technical issues, guide users to our Troubleshooting page or suggest contacting our technical support team.
6. Always maintain user privacy and do not share personal information.
7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative.

Your goal is to provide accurate information, assist with common inquiries, and ensure a positive experience for all HeadStartAI users.`;

// Define an asynchronous POST function to handle incoming requests
export async function POST(req) {

    // Create an instance of the OpenAI client
    // This will allow us to interact with the OpenAI API
    const openai = new OpenAI();
    
    // Parse the incoming JSON request body
    // This will contain user messages or queries that will be sent to the AI
    const data = await req.json();

    // Call the OpenAI API to create a chat completion
    // This sends the user's messages along with the system prompt to generate a response
    const completion = await openai.chat.completions.create({
        messages: [
            // Add the system prompt to instruct the AI on its behavior
            {
                role: 'system',
                content: systemPrompt,
            },
            // Add the user's messages to the request
            // The data object should contain the messages in the format expected by the OpenAI API
            ...data, 
        ],
        // Specify the model to use for generating the response
        model: "gpt-4o-mini",
        // Enable streaming to get the response in chunks
        stream: true, 
    });

    // Create a new ReadableStream to handle the streaming response
    const stream = new ReadableStream({
        // Define how the stream should start and handle incoming data
        async start(controller) {
            // Create a TextEncoder to encode text data into a format suitable for streaming
            const encoder = new TextEncoder();
            try {
                // Iterate over the streamed response from the OpenAI API
                for await (const chunk of completion) {
                    // Extract the content from the chunk of data
                    // This assumes that the chunk has a choices array and delta object
                    const content = chunk.choices[0].delta.content;
                    if (content) {
                        // Encode the content into a Uint8Array and enqueue it to the stream
                        // This sends the data to the frontend as a stream
                        controller.enqueue(encoder.encode(content));
                    }
                }
            } catch (error) {
                // Handle any errors that occur during streaming
                // This logs the error and signals the stream to close with an error
                console.error('Stream error:', error);
                controller.error(error);
            } finally {
                controller.close()
            }
        },
    });  

    // Return a NextResponse with the stream and appropriate headers
    // This sends the streaming response to the frontend
    return new NextResponse(stream, { headers: { 'Content-Type': 'text/plain' } });
}

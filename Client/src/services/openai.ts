import OpenAI from 'openai';

// This would typically come from environment variables
// For demo purposes, we'll use a mock implementation
const mockOpenAI = {
  chat: {
    completions: {
      create: async ({ messages }: { messages: any[] }) => {
        // Extract the user's message
        const userMessage = messages.find(msg => msg.role === 'user')?.content || '';
        
        // Simple keyword-based responses
        let response = "I'm not sure how to answer that. Could you try asking something about our menu, delivery, or services?";
        
        if (userMessage.toLowerCase().includes('menu')) {
          response = "Our menu features a variety of cuisines including gourmet burgers, artisanal pizzas, homemade pasta, and delectable desserts. Would you like me to recommend something specific?";
        } else if (userMessage.toLowerCase().includes('delivery')) {
          response = "We deliver from 10:00 AM to 10:00 PM, seven days a week. Typical delivery times range from 25-40 minutes depending on your location.";
        } else if (userMessage.toLowerCase().includes('vegetarian') || userMessage.toLowerCase().includes('vegan')) {
          response = "Yes, we have a wide range of vegetarian and vegan options across all our cuisine types. Our menu clearly marks these items for your convenience.";
        } else if (userMessage.toLowerCase().includes('payment')) {
          response = "We accept all major credit cards, digital wallets (Apple Pay, Google Pay), and cash on delivery.";
        } else if (userMessage.toLowerCase().includes('order')) {
          response = "You can place an order through our website after signing in. Browse our menu, add items to your cart, and proceed to checkout.";
        } else if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
          response = "Hello! Welcome to Cloud Kitchen. How can I assist you today?";
        }
        
        // Simulate API response structure
        return {
          choices: [
            {
              message: {
                content: response
              }
            }
          ]
        };
      }
    }
  }
};

// In a real application, you would use:
// const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

// For this demo, we'll use our mock implementation
const openai = mockOpenAI as unknown as OpenAI;

export const generateChatResponse = async (message: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for Cloud Kitchen, a food delivery service. Provide concise, friendly responses about our menu, delivery services, and ordering process."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating chat response:', error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};
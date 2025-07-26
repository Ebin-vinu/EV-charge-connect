import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are an AI assistant for EV Charge Connect, a community-based electric vehicle charging platform. Your role is to help users with:

1. Finding and booking EV charging stations
2. Providing technical support for electric vehicles
3. Assisting with payment methods (UPI, bank transfers in Indian currency)
4. Explaining charging processes and best practices
5. Helping with account management and platform features
6. Providing navigation assistance to charging stations
7. Answering questions about different charger types (AC, DC, Super Fast)
8. Community-based charging solutions and sharing

Key platform features:
- Real-time map with charging stations across India and other countries
- AI-powered booking assistance
- UPI and bank transfer payments in Indian Rupees
- Community-driven charging network
- Navigation system integration
- 24/7 customer support

Be helpful, friendly, and knowledgeable about electric vehicles and charging infrastructure. Always prioritize user safety and provide accurate information about EV charging best practices. If you're unsure about specific technical details, recommend contacting technical support or visiting the nearest authorized service center.

Keep responses concise but informative, and always try to guide users toward using the platform's features when relevant.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: data.choices[0].message.content
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

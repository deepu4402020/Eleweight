import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { connectDB } from '@/lib/db';
import DietPlan from '@/models/DietPlan';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const { userEmail, age, weight, height, goal, gender, activityLevel } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    const prompt = `
      Generate a professional, high-performance diet plan for a fitness enthusiast.
      User Details:
      Age: ${age}
      Weight: ${weight}kg
      Height: ${height}cm
      Goal: ${goal}
      Gender: ${gender}
      Activity Level: ${activityLevel}

      The diet plan MUST be structured into exactly 4 meals: Breakfast, Lunch, Snack, and Dinner.
      Each meal must have:
      - Name
      - Precise Calorie count
      - Protein (g)
      - Carbs (g)
      - Fats (g)
      - A short, appetizing description.

      Format the response as a JSON object with the following structure:
      {
        "meals": [
          { "name": "...", "calories": 0, "protein": 0, "carbs": 0, "fats": 0, "description": "..." }
        ],
        "totalCalories": 0,
        "totalProtein": 0,
        "totalCarbs": 0,
        "totalFats": 0
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an elite sports nutritionist. You only respond with valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || '{}');

    const newDietPlan = await DietPlan.create({
      userEmail,
      goal,
      meals: aiResponse.meals,
      totalCalories: aiResponse.totalCalories,
      totalProtein: aiResponse.totalProtein,
      totalCarbs: aiResponse.totalCarbs,
      totalFats: aiResponse.totalFats,
    });

    return NextResponse.json(newDietPlan);
  } catch (error: any) {
    console.error('Diet Plan API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    const plans = await DietPlan.find({ userEmail }).sort({ createdAt: -1 });
    return NextResponse.json(plans);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

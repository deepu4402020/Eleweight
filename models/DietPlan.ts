import mongoose, { Schema, Document } from 'mongoose';

export interface IMeal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
}

export interface IDietPlan extends Document {
  userEmail: string;
  goal: string;
  meals: IMeal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  createdAt: Date;
}

const MealSchema = new Schema<IMeal>({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  description: { type: String, required: true },
});

const DietPlanSchema = new Schema<IDietPlan>({
  userEmail: { type: String, required: true },
  goal: { type: String, required: true },
  meals: [MealSchema],
  totalCalories: { type: Number, required: true },
  totalProtein: { type: Number, required: true },
  totalCarbs: { type: Number, required: true },
  totalFats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DietPlan || mongoose.model<IDietPlan>('DietPlan', DietPlanSchema);

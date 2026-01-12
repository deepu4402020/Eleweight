import mongoose, { Schema, Document, Model, Types } from "mongoose";

// TypeScript interface for Meal
export interface IMeal {
    name: string;
    foodName: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    mealTime: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

// TypeScript interface for Daily Totals
export interface IDailyTotals {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}

// TypeScript interface for FoodLog document
export interface IFoodLog extends Document {
    userId: Types.ObjectId;
    date: Date;
    meals: IMeal[];
    dailyTotals: IDailyTotals;
    createdAt?: Date;
    updatedAt?: Date;
}

const FoodLogSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    meals: [{
        name: { type: String, required: false },
        foodName: { type: String, required: false },
        calories: { type: Number, required: false },
        protein: { type: Number, required: false },
        carbs: { type: Number, required: false },
        fats: { type: Number, required: false },
        mealTime: {
            type: String,
            enum: ['breakfast', 'lunch', 'dinner', 'snack'],
            default: 'snack'
        }
    }],
    dailyTotals: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
        carbs: { type: Number, default: 0 },
        fats: { type: Number, default: 0 }
    }
}, { timestamps: true });

// Create a compound index on userId and date for efficient queries
FoodLogSchema.index({ userId: 1, date: 1 });

// Create and export the model
const FoodLogModel: Model<IFoodLog> = mongoose.models.foodlog || mongoose.model<IFoodLog>("foodlog", FoodLogSchema);

export default FoodLogModel;
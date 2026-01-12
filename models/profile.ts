import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for Profile document
export interface IProfile extends Document {
    name: string;
    email: string;
    password: string;
    // User preferences and fitness data
    weight: number; // in kg
    height: number; // in cm
    age: number;
    gender: 'male' | 'female' | 'other';
    activityLevel: 'sedentary' | 'lightly active' | 'moderately active' | 'very active' | 'extremely active';
    dietType: 'vegetarian' | 'non-vegetarian' | 'vegan';
    fitnessGoals: string[];
    // Calculated values
    dailyCalorieNeeds: number;
    dailyProteinNeeds: number;
    dailyCarbsNeeds: number;
    dailyFatsNeeds: number;
}

const ProfileSchema: Schema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    // User preferences and fitness data
    weight: { type: Number, default: 0 }, // in kg
    height: { type: Number, default: 0 }, // in cm
    age: { type: Number, default: 0 },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'], 
        default: 'other' 
    },
    activityLevel: { 
        type: String, 
        enum: ['sedentary', 'lightly active', 'moderately active', 'very active', 'extremely active'],
        default: 'moderately active'
    },
    dietType: { 
        type: String, 
        enum: ['vegetarian', 'non-vegetarian', 'vegan'], 
        default: 'non-vegetarian' 
    },
    fitnessGoals: { 
        type: [String], 
        default: ['weight maintenance'] 
    },
    // Calculated values
    dailyCalorieNeeds: { type: Number, default: 0 },
    dailyProteinNeeds: { type: Number, default: 0 },
    dailyCarbsNeeds: { type: Number, default: 0 },
    dailyFatsNeeds: { type: Number, default: 0 }
}, { timestamps: true });

// Create and export the model
const ProfileModel: Model<IProfile> = mongoose.models.account || mongoose.model<IProfile>("account", ProfileSchema);

export default ProfileModel;
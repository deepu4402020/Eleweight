import mongoose, { Schema, Document, Model, Types } from "mongoose";

// TypeScript interface for Exercise in a workout
export interface IExercise {
    exerciseId: Types.ObjectId | string;
    name: string;
    muscleGroup: string;
    sets: number;
    reps: number;
    weight?: number; // in kg
    duration?: number; // in second
    restTime?: number; // in seconds between sets
    notes?: string;
}

// TypeScript interface for Workout Day
export interface IWorkoutDay {
    day: number; // Day of the week (1-7) or day number in the plan
    exercises: IExercise[];
    restDay: boolean;
}

// TypeScript interface for WorkoutPlan document
export interface IWorkoutPlan extends Document {
    userId: Types.ObjectId;
    name: string;
    description?: string;
    duration: number; // Duration in days/weeks
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    muscleGroups: string[]; // Target muscle groups
    workoutDays: IWorkoutDay[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const WorkoutPlanSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        default: 7 // Default to 7 days (1 week)
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    muscleGroups: {
        type: [String],
        default: []
    },
    workoutDays: [{
        day: { type: Number, required: true },
        exercises: [{
            exerciseId: { type: Schema.Types.ObjectId, ref: 'exercise', required: false },
            name: { type: String, required: true },
            muscleGroup: { type: String, required: false },
            sets: { type: Number, default: 3 },
            reps: { type: Number, default: 10 },
            weight: { type: Number, required: false },
            duration: { type: Number, required: false },
            restTime: { type: Number, default: 60 },
            notes: { type: String, required: false }
        }],
        restDay: { type: Boolean, default: false }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Create index on userId for efficient queries
WorkoutPlanSchema.index({ userId: 1 });

// Create and export the model
const WorkoutPlanModel: Model<IWorkoutPlan> = mongoose.models.workoutplan || mongoose.model<IWorkoutPlan>("workoutplan", WorkoutPlanSchema);

export default WorkoutPlanModel;
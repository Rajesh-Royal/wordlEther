import * as Yup from "yup";
export const GamePlayerStatsValidationSchema = Yup.object({
    id: Yup.string().required("Unique Id is required"),
    gamePlayed: Yup.number().required("Game played score is required"),
    winPercentage: Yup.number().required("Win Percentage score is required"),
    currentStreak: Yup.number().required("Current Streak score is required"),
    maxStreak: Yup.number().required("Max Streak score is required"),
    Tries: Yup.array().of(
        Yup.number().required("Current Streak score is required")
    ),
    playerName: Yup.string().required("Player Name is required").min(3, "It should be minimum 3 char long").max(20, "Max 20 char are allowed"),
    description: Yup.string().required("Game Description is required").min(3, "It should be minimum 3 char long").max(100, "Max 100 char are allowed")
});
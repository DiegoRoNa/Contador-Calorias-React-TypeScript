import { useMemo } from "react"
import { Activity } from "../types"
import CaloryDisplay from "./CaloryDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {

    // contadores, tomar la categoria de comida y sumar sus calorias
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? 
                            total + activity.calories : total, 0), [activities])

    // contadores, tomar la categoria de comida y sumar sus calorias
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? 
                            total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorías</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloryDisplay calories={caloriesConsumed} text="consumidas"/>
                <CaloryDisplay calories={caloriesBurned} text="quemadas"/>
                <CaloryDisplay calories={netCalories} text="diferencia"/>
            </div>
        </>
    )
}

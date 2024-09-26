import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { ActivityReducer, initialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  // "dispatch" es una funcion interna de react que proporciona para poder ejecutar un reducer
  const [state, dispatch] = useReducer(ActivityReducer, initialState)

  // guardar en local storage
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  // mostrar boton de reinicio de app
  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de calorías</h1>
          <button disabled={!canRestartApp()} 
                className="bg-gray-700 hover:bg-gray-900 p-2 disabled:opacity-10 font-bold uppercase text-white cursor-pointer rounded-lg text-sm"
                onClick={() => dispatch({type: 'restart-app'})} >
          Reiniciar app</button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state}/>
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities}/>
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch}/>
      </section>
    </>
  )
}

export default App

"use client"
import { useState } from "react";
import { increment , decrement , incrementByAmount } from "@/lib/CounterSlice/counter";
import { useAppSelector , useAppDispatch } from "@/lib/hooks";

export default function Home() {
  const [input , setInput] = useState<number>(0);
  const dispatch = useAppDispatch(); 
  const counter = useAppSelector(state => state.counter.value);

  return (
    <main>
      <p>This is counter</p>
      <button onClick={() => {dispatch(increment())}}>Increment</button>
      <button onClick={() => {dispatch(decrement())}}>Decrement</button>
      <input type="number" onChange={(e) => setInput(Number(e.target.value))}/>
      <button onClick={() => {dispatch(incrementByAmount(input))}}>Increment</button>

      <p>{counter}</p>
        This is the Login/SignUp page
    </main>
  );
}

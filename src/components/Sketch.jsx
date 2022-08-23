import React from 'react'
import SketchPad from './SketchPad'
import { TOOL_ELLIPSE, TOOL_LINE, TOOL_PENCIL, TOOL_RECTANGLE } from "./tools";

const Sketch = () => {
  return (
    <>
        <div>
        <SketchPad></SketchPad>
        </div>
    </>

  )
}

export default Sketch
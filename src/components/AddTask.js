import React, { useState } from "react";
function AddTask({onAdd}) {
  const [data, setData] = useState({ text: "", day: "", reminder: false });
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevVal) => {
      return {
        ...prevVal,
        [name]: name ==='reminder'? e.target.checked: value ,
      };
    });
  }
  function onSubmit(e) {
    e.preventDefault()
    if(data.text)
    {
      onAdd(data);
      setData({ text:"", day:"", reminder:false });
    }
    else
    alert("Please enter some Task!");
  }
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          name="text"
          placeholder="Add Task"
          value={data.text}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          name="day"
          value={data.day}
          onChange={handleChange}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          value={data.reminder}
          checked={data.reminder}
          name="reminder"
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
}
export default AddTask;

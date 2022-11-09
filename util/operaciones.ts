export const getData = async () => {
    const res = await fetch("http://localhost:3000/api/task");
    const dataJS= await res.json();
    return dataJS
};
export const handleUpdate = async (id:any, task:any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const content= await res.json();
    return content
    
  } catch (error) {
      console.log(error);
      
  }
};
export const handleDelete = async (id:any) => {
    try {
      const res = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
      });
      const content= await res.json();
      return content
      
    } catch (error) {
        console.log(error);
        
    }
};

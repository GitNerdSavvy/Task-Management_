import {useState, useEffect} from 'react';
const api_base = 'http://localhost:4000';
 
function App() {
    const [list, setLists] = useState([]);
    
	const [popupActive, setPopupActive] = useState(false);
	const [newlists, setNewlists] = useState("");
	const [newlists1, setNewlists1] = useState("");

	useEffect(() => {
		GetLists();
       
	}, []);

	const GetLists = () => {
		fetch(api_base + '/list')
			.then(res => res.json())
			.then(data => setLists(data))
			.catch((err) => console.error("Error: ", err));
	}

  const statuslists = async id => {
		const data = await fetch(api_base + '/List/status/' + id).then(res => res.json());

		setLists(list => list.map(List => {
			if (List._id === data._id) {
				List.status = data.status;
			}

			return List;
		}));
		
	}

  const addlists = async () => {
		const data = await fetch(api_base + "/List/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				title: newlists,
        description: newlists1
			})
		}).then(res => res.json());

		setLists([...list, data]);

		setPopupActive(false);
		setNewlists("");
	}

  const deletelists = async id => {
		const data = await fetch(api_base + '/List/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setLists(list => list.filter(List => List._id !== data.result._id));
	}


  return (
    <div className="App">
      <h1>Task Manager</h1>
      <h4>Your Previous Tasks</h4>
  
      <div className="list">
        {list.length > 0 ? (
          list.map(List => (
            <div
              className={"List" + (List.status ? " is-status" : "")}
              key={List._id}
              onClick={() => statuslists(List._id)}
            >
              <div className="checkbox"></div>
              <div className="tdes">
                <div className="title">{List.title}</div>
                <div className="description">{List.description}</div>
              </div>
              <div className="delete-List" onClick={() => deletelists(List._id)}>
                X
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>
  
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
  
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              placeholder="Enter your title"
              className="add-List-input"
              onChange={e => setNewlists(e.target.value)}
              value={newlists}
            />
            <input
              type="text"
              placeholder="Enter the description"
              className="add-List-input"
              onChange={e => setNewlists1(e.target.value)}
              value={newlists1}
            />
            <div className="button" onClick={addlists}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
  
}

export default App;

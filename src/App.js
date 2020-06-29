import React,{ useEffect,useState} from "react";

import "./styles.css";
import api from './services/api';
function App() {
  const [repositories,setRepositories] = useState([]);
  useEffect(()=>{
    async function load(params) {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    load();
  },[])
  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories',
      {
        "title": "Desafio Node.js", 
        "url": "http://github.com/...", 
        "techs": ["Node.js", "React"]
      }
    );
      setRepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(r=>r.id!==id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r=> (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

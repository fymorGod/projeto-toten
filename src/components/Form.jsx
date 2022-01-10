import { useEffect, useState } from 'react';
import api from '../api/app';
import '../style/form.css';


export function Form() {
    const [ideias, setIdeias] = useState('');

    useEffect(() => {
        api
          .get("/")
          .then((response) => console.log(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      function handleAdd() {
        api
          .post('/register', {
            ideia: ideias
          })
          .then((response) => {
            setIdeias(response.data);
          });
      }
    return (
        <div className="container">
            <div className="title">
                Registre sua Ideia
            </div>
            <form>
                <div className="user-details">
                    <div className="input-box">
                        <span className='details'>Setor da ideia:</span>
                        <select id="choose">
                            <option value="marketing">Marketing</option>
                            <option value="servicos-gerais">Serviços Gerais</option>
                        </select>
                    </div>

                    <div className="wrapper">
                        <span className='info'>Descreva sua ideia</span>
                        <textarea 
                         name="description"
                         id="description" 
                         placeholder='Digite aqui a sua ideia por passos'
                         onChange={e =>setIdeias(e.target.value)}
                         ></textarea>
                        <button onClick={handleAdd} type='submit'>Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
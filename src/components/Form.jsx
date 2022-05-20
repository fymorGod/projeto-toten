import { useEffect, useState } from 'react';
import api from '../api/app';
import '../style/form.css';

export function Form() {
    const [ideias, setIdeias] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const options = [
        {id: '1', name: 'Marketing'}, 
        {id: '2', name: 'Comercial'},
        {id: '3', name: 'Engenharia'},
        {id: '4', name: 'Serviços Gerais'},
        {id: '5', name: 'Outros'},
    ];


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
            ideia: ideias,
            setor:selectValue
          })
          .then((response) => {
            setIdeias(response.data);
          });
      }

    return (
        <div className="container">
            <div className="title">
                Registre sua Iniciativa
            </div>
            <form>
                <div className="user-details">
                    <div className="input-box">
                        <span className='details'>Área de atuação: </span>
                        <select id="choose" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                            {
                                options.map((item, index)=> (
                                    <option key={item.id} value={item.name}> {item.name} </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="wrapper">
                        <span className='info'>Descreva como é a sua ideia</span>
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
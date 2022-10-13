import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addItem = (e) => {
    console.log('in addItem');
    e.preventDefault();
    axios.post('/api/shelf', { description: itemName, image_url: itemImage}).then(() => {
      fetchPets();
    }).catch(error => {
      console.log(error);
      alert('Something went wrong.');
    })
  }

  const deleteItem = (id) => {
    console.log('in deleteItem');
    axios({
      method: 'DELETE',
      url: `/api/shelf/${id}`,
    }).then(response => {
      console.log('DELETE successful');
      fetchPets();
    }).catch(error => {
      console.log(error);
      alert('Something went wrong.');
    })
  }
  
  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={addItem}>
        <input type="text" placeholder="description" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <input type="text" placeholder="image url" value={itemImage} onChange={(e) => setItemImage(e.target.value)}/>
        <input type="submit" />
      </form>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
            <div className="gallery">
                <img src={item.image_url} alt={item.description} />
                <br />
                <div className="desc">{item.description}</div>
                <div style={{textAlign: 'center', padding: '5px'}}>
                  <button style={{cursor: 'pointer'}} onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
            </div>
          </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;

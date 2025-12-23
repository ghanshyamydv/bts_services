import React from 'react'
import { Link } from 'react-router-dom'
function ServiceCrad() {
  return (
    <div className='h-screen flex justify-start'>
      <Link to="/food" className="m-5">
        <div className="w-60 h-70 text-center text-2xl border rounded-2xl overflow-hidden bg-amber-500">
          <img src="https://content.jdmagicbox.com/v2/comp/ambala/w3/9999px171.x171.250116072156.g2w3/catalogue/rudransh-fast-food-and-confectionery-mullana-ambala-fast-food-2yuscm2due-250.jpg" alt="food-img" className="w-full h-auto object-contain"/>
          <h1>Food</h1>
        </div>
        </Link>
        <Link to="/grocery" className="m-5 ">
        <div className="w-60 h-70 text-center text-2xl border rounded-2xl overflow-hidden bg-amber-500">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL84IYLvvQ6goDvljboaBWpcRmfCYu7uUM1w&s" alt="grocery-img" className="w-full h-auto object-contain"/>
          <h1>Grocery</h1>
        </div>
        </Link>
    </div>
  )
}

export default ServiceCrad

import React            from 'react'
import Dropdown         from 'react-dropdown';
import classes          from './FilterBar.module.css'

const FilterBar = props => {
    const options = ['Lowest price', 'Highest price', 'Most recent', 'Most Popular'];
    const defaultOption = '-- Order By --';
    return(
        <div className={classes.filterbar}>
            <div className={classes.Orderbar}>
                <ul>
                    <li className={classes.OrderbarItem} id="#all"      onClick={()=> props.getItems()}                ><a href="#all"      >All      </a></li>
                    <li className={classes.OrderbarItem} id="#hat"      onClick={()=> props.getItemByType('hat')}      ><a href="#hat"      >Hats     </a></li>
                    <li className={classes.OrderbarItem} id="#shirt"    onClick={()=> props.getItemByType('shirt')}    ><a href="#shirt"    >Shirts   </a></li>
                    <li className={classes.OrderbarItem} id="#hoodie"   onClick={()=> props.getItemByType('hoodie')}   ><a href="#hoodie"   >Hoodies  </a></li>
                    <li className={classes.OrderbarItem} id="#stickers" onClick={()=> props.getItemByType('stickers')} ><a href="#stickers" >Stickers </a></li>
                    <li className={classes.OrderbarItem} id="#mug"      onClick={()=> props.getItemByType('mug')}      ><a href="#mug"      >Mugs     </a></li>
                </ul>
            </div>
            <br />
            <Dropdown
                options={options} 
                //onClick={()=> props.orderBy(this.onSelect)}
                onChange={(val)=> props.loadShop(val)}
                value={defaultOption} 
                placeholder="Select an option"
            />
        </div>
    )
}

export default FilterBar
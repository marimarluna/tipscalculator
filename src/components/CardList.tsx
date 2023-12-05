'use client'
import { Item } from './Item'
import { useRoot } from './RootContext'
import './styles.css'

function CardList() {
    const { meals } = useRoot()

    return (
        <div className={"card__content"} style={{ width: "100%"}}>
            <h3>FOOD LIST</h3>
            {meals.map((item, key) => (
                <Item item={item} key={`${item.name}-${key}`} index={key} />
            ))}
        </div>
    )
}

export default CardList
import React, { useEffect, useState } from "react"
import { getUserFavoriteLocalStorage } from "../storageAPI/api"
// import { getUserLocalStorage } from "../storageAPI/api"
import { Row, Col } from "antd"
import style from "./favoritesPage.module.css"
import Breadcrumbs from "../components/breadcrumbs"
import ProgressBar from "../components/progress";

export default function FavoritesPage() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const userData = getUserFavoriteLocalStorage()
        if (userData) setUsers(userData)
    }, [])

    if (users.length === 0) {
        return <h2>Нет избранных</h2>
    }

    return (
        <>
            {users.map((u) => (
                <User key={u.id} user={u} />
            ))}
        </>
    )
}

export function User({ user }) {
    return (
        <div className={style.main}>
            <div className={style.wrapper}>
                <div
                    style={{
                        background: `url(${user.photo}) center center`,
                        backgroundSize: "cover",
                    }}
                    className={style.image}
                />

                <div className={style.text}>
                    <h3>{user.name}</h3>
                    <p>
                        <b>Возраст:</b> {user.age}
                    </p>
                    <p>
                        <b>О себе:</b> {user.about}
                    </p>
                    <p>
                        <b>Соц.сети:</b>
                    </p>
                    {user.social.map((s, i) => (
                        <span key={i} style={{ marginRight: "5px" }}>
                            {s}
                        </span>
                    ))}
                    <p>
                        <b>Хард скилы:</b>
                    </p>{" "}
                    <Row justify="space-around">
                        {user.skills.map((s, i)=> <Col key={i}><ProgressBar percents={s.percent} skillName={s.title} type="circle"/></Col>)}
                    </Row>
                </div>
            </div>
        </div>
    )
}

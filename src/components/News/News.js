import React from 'react';
import { connect } from 'react-redux';

import styles from './news.scss';

const News = props => {
    let news = props.news.map(article => {
        let img;
        if(article.img.indexOf('http') === -1) {
            img = props.fighterImgs[article.img]
        }
        return (
            <div
                className={styles.newsArticle}
                style={{
                    backgroundImage: `url(${img})`
                }}
                key={article.newsId}>
                    <div className={styles.bg}></div>
                    <p>{article.title}</p>
            </div>
        )
    })

    return (
        <div className={styles.newsContainer}>
            <div className={styles.newsHeader}>
                <p className={styles.title}>News</p>
                <span className={styles.viewAll}>View all articles</span>
            </div>
            {/* <p>Coming Soon...</p> */}
            <div className={styles.articlesContainer}>
                { news }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        news: state.news,
        fighterImgs: state.fighterImgs
    }
}

export default connect(mapStateToProps)(News);

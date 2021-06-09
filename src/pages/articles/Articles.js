import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './articles.scss';

const Articles = props => {
    let news = props.news;
    let allNews;
    const [activeFilter, setActiveFilter] = useState('dateDesc');
    const filters = [
        {
            id: 'dateAsc',
            label: 'Date Asc'
        },
        {
            id: 'dateDesc',
            label: 'Date Desc'
        }
    ]

    const sortNews = filter => {
        news.sort((a, b) => {
            if(filter === 'dateAsc') {
                return new Date(a.date.dateAdded) - new Date(b.date.dateAdded)
            } else {
                return new Date(b.date.dateAdded) - new Date(a.date.dateAdded)
            }
        })
    }

    let filterElements = filters.map(filter => {
        let classNames = [styles.filterItem];
        if(activeFilter === filter.id) classNames.push(styles.active);
        sortNews(activeFilter);
        return (
            <div 
                className={classNames.join(' ')} 
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}>
                {filter.label}
            </div>
        )
    })

    const navigateToArticle = id => {
        props.history.push(`/article/${id}`);
    }

    if(props.news.length === 0) {
        allNews = <p>Loading articles...</p>
    } else if(Object.keys(props.fighterImgs).length > 0) {
        allNews = news.map(article => {
            // let imagesURL = './../../assets/images/';
            // let articleImageURL = imagesURL + article.articleImg + '.png';
            let articleImageURL = props.fighterImgs[article.articleImg];
            let date = new Date(article.date.dateAdded).toString();
    
            return (
                <div className={styles.articleContainer} key={article.newsId}>
                    <div className={styles.leftImgSection}>
                        <img 
                            src={articleImageURL}
                            className={styles.articleImg} />
                    </div>
                    <div className={styles.rightSection}>
                        <p className={styles.articleTitle}>{article.title}</p>
                        <p className={styles.content}>{article.body}</p>
                        <div className={styles.actionContainer}>
                            <span>{date}</span>
                            <span 
                                className={styles.viewMore}
                                onClick={() => navigateToArticle(article.newsId)}>
                                    Read article
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className={styles.articlesWrapper}>
            <div className={styles.filter}>
                <span>Filter by: </span>
                <div className={styles.filterItems}>
                    { filterElements }
                </div>
            </div>
            <div className={styles.allArticles}>
                { allNews }
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

export default connect(mapStateToProps)(Articles);

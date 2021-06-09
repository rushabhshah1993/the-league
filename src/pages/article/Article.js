import React from 'react';
import { connect } from 'react-redux';

import styles from './article.scss';

const Article = props => {
    let element;
    let article = props.news.find(article => 
        article.newsId === props.match.params.articleId);
    
    if(article && Object.keys(props.fighterImgs).length > 0) {
        // let imagesURL = './../../assets/images/';
        // let articleImageURL = imagesURL + article.articleImg + '.png';
        let articleImageURL = props.fighterImgs[article.articleImg];
        let articleDate = new Date(article.date.dateAdded).toLocaleString();

        element = (
            <div>
                <div className={styles.header}>
                    <img 
                        src={articleImageURL}
                        className={styles.articleImg} />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <p>{article.title}</p>
                    </div>
                    <div className={styles.articleMeta}>
                        <p className={styles.location}>
                            <span>{article.location.city}, </span>
                            <span>{article.location.country}</span>
                        </p>
                        <p className={styles.date}>
                            {articleDate}
                        </p>
                    </div>
                    <div className={styles.articleBody}>
                        {article.body}
                        <span
                            className={styles.viewAll} 
                            onClick={() =>  props.history.push('/articles')}>
                            View all articles
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.articleContainer}>
            { element }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        news: state.news,
        fighterImgs: state.fighterImgs
    }
}

export default connect(mapStateToProps)(Article);

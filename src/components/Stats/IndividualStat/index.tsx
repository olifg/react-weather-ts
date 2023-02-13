import styles from './styles.module.sass'


type WeatherStatPropsType = {
    label: string;
    content: string;
}


export const WeatherStat = ({ label, content }: WeatherStatPropsType) => {
    return (<div className={styles.stat}>
        <span className={styles.content}>{content}</span>
        <span className={styles.label}>{label}</span>
    </div>)
}
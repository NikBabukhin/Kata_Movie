import React, { useState } from "react";
import style from "./CardContent.module.css";
import { Genres } from "../Genres/Genres";
import { format } from "date-fns";
import { ConfigProvider, Progress, Rate } from "antd";
import { postRating } from "../../requests/postRating";
import { Loading } from "../Loading/Loading";
import { Error as ErrorComponent} from "../Error/Error";

type CardContentPropsType = {
  title: string,
  release_date: string,
  genres: number[],
  overview: string | null,
  id: number,
  vote_average: number,
  currentRating?: number
}

export const CardContent: React.FC<CardContentPropsType> = ({
  title, release_date, genres,
  overview, id, vote_average, currentRating
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorRating, setErrorRating] = useState<string|null>(null)
  const [localRating, setLocalRating] = useState<number|undefined>(currentRating)

  const getSmallText = (text: string) => {
    const titleLength = title.length > 20 ? title.length * 3 : 0;
    const mostLength = 180 - titleLength;
    if (text.length <= mostLength && text.length > 0) {
      return text;
    } else if (text.length > mostLength) {
      for (let i = mostLength; i <= mostLength + 20; i++) {
        if (text[i] === " ") {
          return text.slice(0, i) + " ...";
        } else if (i === mostLength + 20) {
          return text.slice(0, i) + " ...";
        }
      }
    } else {
      return <i>{"No movie description has been added yet..."}</i>;
    }
  };

  const getTime = (time: string | null) => {
    if (time === "") {
      return "Unknown";
    } else {
      return format((new Date(release_date)).getTime(), "PP");
    }
  };

  const setRating = (value: number) => {
    setIsLoading(true)
    postRating(id, value).then(res=>{
      if (res) {
        setErrorRating(null)
        setIsLoading(false)
        setLocalRating(value)
      } else {
        throw new Error('Error with server')
      }
    }).catch(err=>{
      setIsLoading(false)
      setLocalRating(undefined)
      setErrorRating(err.message)
      setTimeout(()=>{
        setErrorRating(null)
      }, 2000)
    })
  };

  return <div className={style.cardContent}>
    <div className={style.contentWrapper}>
      <div className={style.headerWrapper}>
        <h5 className={style.header} onClick={() => console.log(id)}>{title}</h5>
        <RatingCircle rating={Math.round(vote_average * 10) / 10} />
      </div>
      <span className={style.date}>{getTime(release_date)}</span>
      <Genres genres={genres} />
      <span className={style.text}>{getSmallText(overview || "")}</span>
    </div>
    <div className={style.ratingWrapper}>
      {errorRating? <ErrorComponent errorText={errorRating}/> : isLoading? <Loading size={'small'} background={false}/>
        : <Rate
        allowHalf
        defaultValue={localRating}
        onChange={setRating}
        count={10}
        style={{ fontSize: "16px"}} />}
    </div>
  </div>;
};

type RatingCirclePropsType = {
  rating: number
}

export const RatingCircle: React.FC<RatingCirclePropsType> = ({ rating }) => {
  const whatIsColor = () => {
    if (rating < 3) {
      return "#E90000";
    } else if (rating >= 3 && rating < 5) {
      return "#E97E00";
    } else if (rating >= 5 && rating < 7) {
      return "#E9D100";
    } else {
      return "#66E900";
    }
  };

  return <div className={style.ratingCircle}><ConfigProvider
    theme={{
      components: {
        Progress: {
          circleTextColor: "rgba(0, 0, 0, 1)",
          remainingColor: whatIsColor(),
          defaultColor: whatIsColor()
        }
      }
    }}
  >
    <Progress
      type="circle"
      percent={rating * 10}
      size={30}
      format={persent => rating} />
  </ConfigProvider>
  </div>;
};
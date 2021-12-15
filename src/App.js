import "./App.css";
import moment from "moment";
import CommentsPerDay from "./components/CommentsPerDay";
import PostsPerDay from "./components/PostsPerDay";
import SentimentPerComment from "./components/CommentsPerFeeling";
import CommentsTimeLine from "./components/CommentsTimeLine";
import WordsCloud from "./components/WordCloud";
import FormatPost from "./components/FormatPost";
import FollowersTimeLine from "./components/FollowersTimeLine";
import CommentsAndShares from "./components/CommentsAndShares";
import InteractionPerPost from "./components/InteractionPerPost";
import PostsTimeLine from "./components/PostsTimeLine";
import SocialCommentsTimeLine from "./components/SocialCommentsTimeLine";
import CommentsClasificationTimeLine from "./components/CommentsClasificationTimeLine";
import PostClasificationTimeLine from "./components/PostClasificationTimeLine";
import PostClasificationBarchart from "./components/PostClasificationBarchart";
import CommentsClasificationBarchart from "./components/CommentsClasificationBarchart";

function App() {
  return (
    <section className="home">
      <div className="container">
        <div className="home-wrap">
          <div className="graph-wrap">
            <div className="single-graph">
              <CommentsPerDay
                title="Comentarios por día"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            quam voluptatibus" client_id={2} social_network="YT" profile_id={2} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
              />
            </div>
            <div className="single-graph">
              <PostsPerDay
                title="Posteos por día"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            quam voluptatibus " client_id={3} social_network="FB" profile_id={3} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
              />
            </div>
            <div className="single-graph">
              <SentimentPerComment
                title="Comentarios por sentimiento"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            quam voluptatibus " client_id={2} social_network="YT" profile_id={2} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
              />
            </div>
            <div className="single-graph">
              <CommentsTimeLine
                title="Cantidad total de comentarios"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus " client_id={3} social_network="FB" profile_id={3}
                since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days"
              />
            </div>
            <div className="word-cloud">
              <WordsCloud
                title="Nube de palabras"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis quam voluptatibus"
                client_id={2} social_network="YT" profile_id={2} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
              />
            </div>
            <div className="single-graph">
              <FormatPost
                title="Formato de publicaciones"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus "
                client_id={3} social_network="FB" profile_id={3} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
              />
            </div>
            <div className="single-graph">
              <FollowersTimeLine
                title="Cantidad total de seguidores"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus " client_id={2} social_network="YT" profile_id={2}
                since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days"
              />
            </div>
            <div className="single-graph">
              <CommentsAndShares
                title="Volumen comentarios y compartidos"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus " client_id={3} social_network="FB" profile_id={3}
                since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days"
              />
            </div>
            <div className="single-graph">
              <InteractionPerPost title="Interacción por publicación"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus"  since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days"
              />
            </div>
            <div className="single-graph">
              <PostsTimeLine title="Línea temporal de publicaciones" description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus" client_id={3} social_network="FB" profile_id={3} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days"
              />
            </div>
            <div className="single-graph">
              <SocialCommentsTimeLine title="Línea temporal de comentarios en redes sociales" description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus" client_id={2} social_network="YT" profile_id={2} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days" />
            </div>
            <div className="single-graph">
              <CommentsClasificationTimeLine title="Línea temporal de clasificación de comentarios" description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus"  since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days" />
            </div>
            <div className="single-graph">
              <PostClasificationTimeLine title="Clasificación de publicaciones" description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus" client_id={3} social_network="FB" profile_id={3} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")}
                interval="days" />
            </div>
            <div className="single-graph">
              <PostClasificationBarchart title="Clasificación de publicaciones en barras" description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus" client_id={2} social_network="YT" profile_id={2} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")} />

            </div>
            <div className="single-graph">
              <CommentsClasificationBarchart title="Clasificación de comentarios en barras" description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              quam voluptatibus" client_id={3} social_network="FB" profile_id={3} since_str={moment("2021-05-20T00:00:00Z")}
                until_str={moment("2021-05-25T00:00:00Z")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

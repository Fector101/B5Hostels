import { TrendingUp, Tv, ChartNoAxesColumn, ChartColumn, Vote, ChevronRight, ArrowRight, Clock, Users, MoveRight, Plus } from "lucide-react"
// import Carousel from "../components/ui/carousel/Carousel"
// import SectionPreview from "./../components/js/SectionPreview"
// import Recommendations from "./../components/js/Recommendations"
// import LoginComponent from "../components/ui/login-signup/LoginForm"
import '../components/css/historypage.css'
function Myprogress({ value }) {
    console.log(value + '%')
    return (
        <div className="progress-range" style={{ 'width': '100%', backgroundColor: '#cac8c8', height: '10px', borderRadius: '5px', marginBottom: '4px', overflow: 'hidden' }}>
            <div style={{ width: value + '%', backgroundColor: '#4ec9e6', height: '100%' }} className="progress-value"></div>
        </div>
    )
}
function VotingStats({ title, des, runners_info_tuple }) {
    // runners_info_tuple =[['name',140]]   
    // runners_info_tuple =[['name','votes'],...]   
    const total_votes = runners_info_tuple.reduce((sum, [, votes]) => sum + votes, 0);
    // console.log(total_votes, '---')
    return (
        <div className="voting-stats-card">
            <div class="row"><div class="badge active"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dot"><circle cx="12.1" cy="12.1" r="1"></circle></svg> Active</div><div class="caption"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><p>Ends: 2025-04-10</p></div></div>
            <h4>{title}</h4>
            <p className="caption">{des}</p>
            <div className="runners-box">
                {runners_info_tuple?.map(([name, votes], i) => {
                    const percentage = total_votes > 0 ? ((votes / total_votes) * 100).toFixed(2) : 0;
                    console.log(total_votes, '---')

                    return (
                        <div>
                            <div className="row">
                                <p>{name}</p>
                                <p className="caption">{votes} votes</p>
                            </div>
                            <Myprogress value={percentage} />
                        </div>)
                })}
            </div>
            <p>Total votes: {total_votes}</p>
            <a className="view-all-votes-btn primary-btn">View Details <ArrowRight /></a>
        </div>
    )
}
export default function Historypage({ top_movies_data__ }) {
    const votingStatsArray = [
        {
            title: "Best Student Representative",
            des: "Vote for the best candidate to represent the student body.",
            runners_info_tuple: [
                ["Alice Johnson", 250],
                ["Bob Smith", 180],
                ["Charlie Brown", 320],
                ["Diana Prince", 210]
            ]
        },
        {
            title: "Sports Captain Election",
            des: "Choose the next leader for our sports team.",
            runners_info_tuple: [
                ["Ethan Williams", 200],
                ["Sophie Turner", 340],
                ["Liam Brown", 275]
            ]
        },
        {
            title: "Best Club of the Year",
            des: "Vote for your favorite club on campus.",
            runners_info_tuple: [
                ["Drama Club", 410],
                ["Robotics Club", 350],
                ["Music Club", 290]
            ]
        }
    ];

    // Usage in a component


    return (
        <div className="history-page page">
            <section className="heading">
                <div>
                    <h1>Past Polls</h1>
                    <p className="caption">View results from previous polls</p>
                </div>
            </section>

            <section className="recent-votings">
                <div className="main-votings-box">
                    {votingStatsArray.map((votingData, index) => (
                        <VotingStats key={index} {...votingData} />
                    ))}
                </div>
            </section>
            {/* <main>
                {top_movies_data__ && <Carousel data={top_movies_data__.results?.slice(0, 7)} />}
            </main>
            {top_movies_data__ &&
                <>
                    <SectionPreview title={'Trending'} icon={<TrendingUp />} data_info={{ types: ['Movies', 'TV Shows'], active: 'Movies' }} data={top_movies_data__.results} url='trending' />
                    <SectionPreview title={'Top'} icon={<ChartNoAxesColumn />} data_info={{ types: ['Movies', 'TV Shows'], active: 'Movies' }} data={top_movies_data__.results} url='top' />
                    <SectionPreview title={'Ongoing'} icon={<Tv />} data_info={{ types: ['TV Shows'] }} data={top_movies_data__.results} url='ongoing' />
                    <Recommendations data={top_movies_data__.results.slice(0, 6)} />
                    <div className="SectionPreview">
                        <LoginComponent />
                    </div>
                </>
            } */}
        </div>
    )
}
// {/* add ongoing,top,trending,Upcoming to Movies/Shows page */}
// {/* <SectionPreview title={'Upcoming'} icon={<Clock3 />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data__.results}/> */}
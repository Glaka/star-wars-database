import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import useAsyncEffect from 'use-async-effect/types';
import { useAsyncEffect } from 'use-async-effect';
import { v4 } from 'node-uuid';
import PersonComponent from './PersonComponent';
import IsLoadingComponent from '../IsLoadingComponent/IsLoadingComponent';

const PeopleComponent = () => {

    let { id } = useParams();

    const [currPage, setCurrPage] = useState<number>((+id!)); // upd

    const [prevPage, setPrevPage] = useState('');
    const [nextPage, setNextPage] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [fetchingData, setFetchingData] = useState(false);
    const [people, setPeople] = useState([]);
    const [paginationCount, setPaginationCount] = useState(0);

    const fetchData = async (a: any): Promise<any> => {
        await fetch(`https://swapi.co/api/people/?page=${a}`)
            .then(data => data.json())
            .then(data => {
                setPeople(data.results)
                setPaginationCount(data.count)
                setPrevPage(data.previous)
                setNextPage(data.next)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false)
                alert(err);
            })
    }

    useAsyncEffect(async () => {
        if (fetchingData) return false
        setFetchingData(true)
        fetchData(currPage)
    });

    const changePage = (i: any) => {
        setIsLoading(true)
        setCurrPage(i)
        setFetchingData(false)
    }

    return (
        <React.Fragment>
            <IsLoadingComponent isLoading={isLoading} />

            <div className="row my-2">
                {people && people.map((people: any) => {
                    return (
                        <PersonComponent {...people} key={v4()} />
                    )
                })}
            </div>

            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">

                        {prevPage && (
                            <li className="page-item">
                                <Link
                                    className="page-link"
                                    onClick={() => { changePage(currPage - 1) }}
                                    to={`/people${currPage - 1}`}>Previous
                                    </Link>
                            </li>
                        )}

                        {(() => {
                            let pagination = [];
                            let pagCount = Math.ceil(paginationCount / 10)
                            for (let i = 0; i < pagCount; i++) {
                                const index = i + 1;
                                const classes = ['page-item'];
                                index === currPage && classes.push('active');
                                pagination.push(<li
                                    className={classes.join(' ')}
                                    key={i}>
                                    <Link
                                        className="page-link"
                                        onClick={() => { changePage(index) }}
                                        to={`/people${index}`}>{index}
                                    </Link>
                                </li>)
                            }
                            return pagination
                        })()}

                        {nextPage && (
                            <li className="page-item">
                                <Link
                                    className="page-link"
                                    onClick={() => { changePage(currPage + 1) }}
                                    to={`/people${currPage + 1}`}>Next
                            </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

        </React.Fragment>
    )
}

export default PeopleComponent
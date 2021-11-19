import React, { useState } from 'react'
import './StreamView.scss'
import Loader from '../../components/loader/Loader'
import TwitchPlayer from '../../components/twitch/TwitchPlayer'
import { Stream } from '../../models/Stream'
import { useGetLiveStreamsQuery } from '../../actions/api';


export const StreamView = () => {

  const [active, setActive] = useState<string[]>([])
  const result = useGetLiveStreamsQuery(undefined, { pollingInterval: 60000 })


  if (result.isError) {
    return <div><h1>{String(result.error)}</h1></div>
  }

  if (result.isLoading) {
    return <Loader />
  }

  if (!result.isSuccess) {
    return <h1>Not Success</h1>
  }

  const toggleView = (stream: Stream) => {
    const key = stream.user_name
    const activeList = [...active]
    const index = activeList.indexOf(key)
    if (index > -1) {
      activeList.splice(index, 1)
    } else {
      activeList.push(key)
    }

    setActive(activeList)
  }

  const renderView = (count: number) => {
    return (
      <span className={'stream-view-count'}>
        <i className="material-icons text-danger md-18 mx-1">remove_red_eye</i>
        <span>{count}</span>
      </span>
    )
  }

  const renderList = (streams: Stream[]) => {
    return (
      <ul className={`list-group`}>
        {streams.map(stream =>
          (<li onClick={() => toggleView(stream)} className='list-group-item' key={stream.id}>
            <div className={'stream-view-item'}>
              <h6>{stream.user_name} - {renderView(stream.viewer_count)}</h6>
              {active.includes(stream.user_name) ?
                <TwitchPlayer
                  theme={'dark'}
                  width={'100%'}
                  targetClass={`twitch_${stream.user_id}`}
                  channel={stream.user_name}
                />
                :
                ''
              }
            </div>
          </li>)
        )}
      </ul>
    )
  }

  return (
    <div style={{ margin: '0 auto' }} className={`stream-view-container ${result.isFetching ? 'disabled':''}`}>
      {result.data.length === 0 ? <h6>No streams found</h6> : renderList(result.data)}
      <button onClick={result.refetch}>Refetch Posts</button>
    </div>
  )
}

export default[
    {
      path:'/',
      redirect: '/sHomepage',
    },
    {
      path:'/sHomepage',
      component: () => import('../components/HomePage.vue'),
      redirect: '/HomePage',
      children: [
        {
          path: '/HomePage',
          component: () => import('../components/HelloWorld.vue'),
          redirect: '/MainComp',
          children: [
            {
              path: '/MainComp',
              name: 'MainHome',
              component: () => import('../components/MainComp.vue')
            },
            {
              path: '/SingerAll',
              name: 'SingerAll',
              component: () => import('../components/SingerAll.vue')
            },
            {
              path: '/AlbumAll',
              name: 'AlbumAll',
              redirect:'/NewSongAndNewAlbum/NewAlbumPost/AlbumPostAll',
              component: () => import('../components/AlbumAll.vue'),
            },
            {
              path: '/NewSong',
              name: 'NewSong',
              component: () => import('../components/NewSong.vue')
            },
            {
              path: '/RadioAll',
              name: 'RadioAll',
              component: () => import('../components/RadioAll.vue')
            },
            {
              path: '/PlayListAll',
              name: 'PlayListAll',
              component: () => import('../components/PlayListAll.vue')
            },
            {
              path: '/RankListAll',
              name: 'RankListAll',
              component: () => import('../components/RankListAll.vue'),
              redirect: '/SingerRank',
              children: [
                {
                  path: '/SingerRank',
                  component: () => import('../components/RankComp/SingerRank')
                },
                {
                  path: '/SongRank',
                  component: () => import('../components/RankComp/SongRank')
                },
                {
                  path: '/SongWorldRank',
                  component: () => import('../components/RankComp/SongWorldRank')
                }
              ]
            },
            {
              path: '/MVAll',
              name: 'MVAll',
              component: () => import('../components/MVAll.vue')
            },
            {
              path: '/NewMusicAll',
              name: 'NewMusicAll',
              redirect:'/NewSongAndNewAlbum/NewSongPost',
              component: () => import('../components/NewMusicAll.vue'),
              children:[
                {
                  path: '/NewSongAndNewAlbum/NewSongPost',
                  name: 'NewSongPost',
                  component: () => import('../components/NewSongAndNewAlbum/NewSongPost.vue'),
                },
                {
                  path: '/NewSongAndNewAlbum/NewAlbumPost',
                  name: 'NewAlbumPost',
                  redirect:'/NewSongAndNewAlbum/NewAlbumPost/AlbumPostAll',
                  component: () => import('../components/NewSongAndNewAlbum/NewAlbumPost.vue'),
                  children:[
                    {
                      path: '/NewSongAndNewAlbum/NewAlbumPost/AlbumPostAll',
                      name: 'AlbumPostAll',
                      component: () => import('../components/NewSongAndNewAlbum/AlbumPostAll.vue'),
                    },
                    {
                      path: '/NewSongAndNewAlbum/NewAlbumPost/AlbumPosthy',
                      name: 'AlbumPosthy',
                      component: () => import('../components/NewSongAndNewAlbum/AlbumPosthy.vue'),
                    },
                    {
                      path: '/NewSongAndNewAlbum/NewAlbumPost/AlbumPostOM',
                      name: 'AlbumPostOM',
                      component: () => import('../components/NewSongAndNewAlbum/AlbumPostOM.vue'),
                    },
                    {
                      path: '/NewSongAndNewAlbum/NewAlbumPost/AlbumPostKor',
                      name: 'AlbumPostKor',
                      component: () => import('../components/NewSongAndNewAlbum/AlbumPostKor.vue'),
                    },
                    {
                      path: '/NewSongAndNewAlbum/NewAlbumPost/AlbumPostJP',
                      name: 'AlbumPostJP',
                      component: () => import('../components/NewSongAndNewAlbum/AlbumPostJP.vue'),
                    }
                  ]
                }
              ]
            },
            {
              path: '/MusicWall',
              name: 'MusicWall',
              component: () => import('../components/MusicWall.vue')
            },
            {
              path: '/MyMusic',
              name: 'MyMusic',
              component: () => import('../components/MyMusic.vue')
            },
            {
              path: '/MusicInfo',
              name: 'MusicInfo',
              component: () => import('../components/MusicInfo.vue')
            },
            {
              path: '/SingerDetail/:id',
              name: 'SingerDetail',
              component: () => import('../components/SingerDetail/SingerDetailComp.vue')
            },
            {
              path: '/SongDetail/:id',
              name: 'SongDetail',
              component: () => import('../components/SongDetail/SongDetailComp.vue')
            },
            {
              path: '/shotmusic/:id',
              name: 'hotsong',
              component: () => import('../components/SingerDetail/SingerHotMusic.vue')
            },
            {
              path: '/allmusic/:id',
              name: 'allmusic',
              component: () => import('../components/SingerDetail/SingerAllmusic.vue')
            },
            {
              path: '/playlistdetail/:id',
              name: 'PlaylistDetailComp',
              component: () => import('../components/Playlistdetail/PlaylistDetailComp.vue')
            },
            {
              path: '/mvdetail/:id',
              name: 'MVdetailComp',
              component: () => import('../components/MVdetail/MVdetailComp.vue')
            },
            {
              path: '/albumdetail/:id',
              name: 'AlbumdetailComp',
              component: () => import('../components/Albumdetail/AlbumdetailComp.vue')
            },
            {
              path: '/songplay/:id',
              name: 'SongPlayComp',
              component: () => import('../components/SongPlaydetail/SongPlayComp.vue')
            },
            {
              path:'/UserHome',
              component: () => import("../components/UserComp/UserHome/MyHomeComp")
            },
            {
              path:'/PersonUpdateInfo',
              component: () => import("../components/UserComp/MyInformation")
            },
            {
              path:'/UserPlaylist/:id',
              component: () => import("../components/UserComp/UserPlaylist")
            }
          ]
        },
        {
          path:'/register',
          component: () => import('../components/Register.vue')
        },
        {
          path:'/search/:key',
          name:'searchKey',
          component: () => import('../components/SearchPage.vue')
        },
        {
          path:'/search',
          name:'searchNull',
          component: () => import('../components/SearchPage.vue')
        }
      ]
    }
]

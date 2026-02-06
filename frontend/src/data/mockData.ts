

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

export interface LeaderboardRank {
  type: 'weekly' | 'monthly';
  rank: number;
  points: number;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  hashtags: string[];
  image?: string;
  hasAchievement: boolean;
  achievement?: {
    title: string;
    subtitle: string;
    ranks: LeaderboardRank[];
  };
  likes: number;
  comments: number;
  commentsList: Comment[];
  shares: number;
  isLiked: boolean;
  createdAt: Date;
}

export const currentUser: User = {
  id: 'current-user',
  name: 'Jean Pierre',
  username: 'name',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  isFollowing: false,
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Manisha Meena',
    username: 'ajayujds',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manisha',
    isFollowing: true,
  },
  {
    id: '2',
    name: 'Sunita Rani',
    username: 'sunitag75n',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Sunita',
    isFollowing: false,
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    username: 'rahulk92',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    isFollowing: true,
  },
  {
    id: '4',
    name: 'Priya Sharma',
    username: 'priyasharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    isFollowing: false,
  },
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    user: mockUsers[2],
    content: 'Congratulations! Amazing achievement! 🎉',
    likes: 5,
    createdAt: new Date('2026-02-05T12:00:00'),
  },
  {
    id: 'c2',
    user: mockUsers[3],
    content: 'Keep up the great work! You deserve it.',
    likes: 3,
    createdAt: new Date('2026-02-05T11:55:00'),
  },
  {
    id: 'c3',
    user: mockUsers[1],
    content: 'Inspiring! I need to work harder to catch up 💪',
    likes: 2,
    createdAt: new Date('2026-02-05T11:52:00'),
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: '🏆 LEADERBOARD ACHIEVEMENT 🏆\n🎯 I secured rank in TaskPlanet Leaderboard!\n\n📈 Play now and join the competition!',
    hashtags: ['TaskPlanet', 'Leaderboard', 'Winning'],
    hasAchievement: true,
    achievement: {
      title: '🎉 CONGRATULATIONS! 🎉',
      subtitle: 'MY Leaderboard Achievement',
      ranks: [
        { type: 'weekly', rank: 36, points: 300 },
        { type: 'monthly', rank: 34, points: 700 },
      ],
    },
    likes: 24,
    comments: 5,
    commentsList: [...mockComments],
    shares: 2,
    isLiked: false,
    createdAt: new Date('2026-02-05T11:50:34'),
  },
  {
    id: '2',
    user: mockUsers[1],
    content: '🏆 LEADERBOARD ACHIEVEMENT 🏆\n🎯 I secured rank in TaskPlanet Leaderboard!\n\n📈 Play now and join the competition!',
    hashtags: ['TaskPlanet', 'Leaderboard', 'Winning'],
    hasAchievement: true,
    achievement: {
      title: '🎉 CONGRATULATIONS! 🎉',
      subtitle: 'MY Leaderboard Achievement',
      ranks: [
        { type: 'weekly', rank: 36, points: 300 },
        { type: 'monthly', rank: 34, points: 700 },
      ],
    },
    likes: 0,
    comments: 3,
    commentsList: [mockComments[0], mockComments[1]],
    shares: 0,
    isLiked: false,
    createdAt: new Date('2026-02-05T08:31:46'),
  },
  {
    id: '3',
    user: mockUsers[2],
    content: 'Just completed my first 100 tasks on TaskPlanet! 🎉 The journey has been amazing so far. Thank you all for the support!',
    hashtags: ['Milestone', 'TaskPlanet', 'Achievement'],
    hasAchievement: false,
    likes: 45,
    comments: 12,
    commentsList: [],
    shares: 8,
    isLiked: true,
    createdAt: new Date('2026-02-04T15:22:00'),
  },
  {
    id: '4',
    user: mockUsers[3],
    content: 'Working from home today ☕ Starting the day with some productivity tasks. Who else is grinding today?',
    hashtags: ['WorkFromHome', 'Productivity'],
    hasAchievement: false,
    likes: 18,
    comments: 7,
    commentsList: [mockComments[2]],
    shares: 1,
    isLiked: false,
    createdAt: new Date('2026-02-04T09:15:00'),
  },
];

export const filterTabs = [
  { id: 'all', label: 'All Post' },
  { id: 'foryou', label: 'For You' },
  { id: 'mostliked', label: 'Most Liked' },
  { id: 'mostcommented', label: 'Most Commented' },
  { id: 'mostshared', label: 'Most Shared' },
];

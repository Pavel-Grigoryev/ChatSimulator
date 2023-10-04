import { InitialCommentsState } from 'src/features/comments/comments-slice';
import { START_PAGE } from 'src/common/constants';
import { commentsActions, commentsReducer } from 'src/features/comments/index';

describe('commentsReducer', () => {
  let startState: InitialCommentsState;
  let startNewState: InitialCommentsState;

  beforeEach(() => {
    startState = {
      page: START_PAGE,
      currentPage: START_PAGE,
      pageSize: null,
      totalPages: null,
      comments: [],
      authors: [],
    };
    startNewState = {
      page: 1,
      currentPage: 2,
      pageSize: 6,
      totalPages: 3,
      comments: [
        {
          id: 1,
          created: '2021-07-04T14:44:01.038111+00:00',
          text: 'The Force will be with you. Always.',
          author: 1,
          parent: null,
          likes: 1024,
          isLiked: true,
        },
        {
          id: 13,
          created: '2021-07-04T14:44:40.038111+00:00',
          text: 'Everything is proceeding as I have foreseen.',
          author: 8,
          parent: null,
          likes: 37,
          isLiked: false,
        },
      ],
      authors: [],
    };
  });

  it('comments should be set when app initialised', () => {
    const newState = {
      pagination: {
        page: 1,
        size: 6,
        total_pages: 3,
      },
      data: [
        {
          id: 1,
          created: '2021-07-04T14:44:01.038111+00:00',
          text: 'The Force will be with you. Always.',
          author: 1,
          parent: null,
          likes: 1024,
        },
        {
          id: 13,
          created: '2021-07-04T14:44:40.038111+00:00',
          text: 'Everything is proceeding as I have foreseen.',
          author: 8,
          parent: null,
          likes: 37,
        },
      ],
    };

    const endState = commentsReducer(
      startState,
      commentsActions.fetchComments.fulfilled(
        {
          page: newState.pagination.page,
          pageSize: newState.pagination.size,
          totalPages: newState.pagination.total_pages,
          comments: newState.data,
        },
        'requestId',
        { page: 2 }
      )
    );

    expect(endState.comments.length).toBe(2);
    expect(endState.comments[1].isLiked).toBe(false);
    expect(endState.comments[0].id).toBe(13);
    expect(endState.totalPages).toBe(3);
    expect(endState.pageSize).toBe(6);
    expect(endState.page).toBe(1);
  });

  it('comments should be add when the button Load More was clicked', () => {
    const newState = {
      pagination: {
        page: 2,
        size: 6,
        total_pages: 3,
      },
      data: [
        {
          id: 5,
          created: '2021-07-05T14:44:01.038111+00:00',
          text: 'If you strike me down I shall become more powerful than you can possibly imagine.',
          author: 1,
          parent: null,
          likes: 0,
        },
        {
          id: 100,
          created: '2021-07-04T14:44:01.038111+00:00',
          text: 'Hello there!',
          author: 1,
          parent: null,
          likes: 50,
        },
      ],
    };

    const endState = commentsReducer(
      startNewState,
      commentsActions.fetchComments.fulfilled(
        {
          page: newState.pagination.page,
          pageSize: newState.pagination.size,
          totalPages: newState.pagination.total_pages,
          comments: newState.data,
        },
        'requestId',
        { page: 2 }
      )
    );

    expect(endState.comments.length).toBe(4);
    expect(endState.comments[1].isLiked).toBe(false);
    expect(endState.comments[3].isLiked).toBe(false);
    expect(endState.comments[3].id).toBe(100);
    expect(endState.comments[0].id).toBe(1);
    expect(endState.totalPages).toBe(3);
    expect(endState.pageSize).toBe(6);
    expect(endState.page).toBe(2);
  });

  it('a like should be added in a correct comment', () => {
    const endState = commentsReducer(startNewState, commentsActions.setIsLiked({ id: 13 }));

    expect(endState.comments[1].likes).toBe(38);
    expect(endState.comments[1].isLiked).toBe(true);
  });

  it('a like should be deleted in a correct comment', () => {
    const endState = commentsReducer(startNewState, commentsActions.setIsLiked({ id: 1 }));

    expect(endState.comments[0].likes).toBe(1023);
    expect(endState.comments[0].isLiked).toBe(false);
  });

  it('current page should be setted', () => {
    const endState = commentsReducer(startNewState, commentsActions.setCurrentPage());

    expect(endState.currentPage).toBe(3);
  });

  it('authors should be set when app initialised', () => {
    const newState = [
      {
        id: 1,
        name: 'Obi-Wan Kenobi',
        avatar: 'img1',
      },
      {
        id: 2,
        name: 'Yoda',
        avatar: 'img2',
      },
      {
        id: 3,
        name: 'Darth Vader',
        avatar: 'img2',
      },
    ];

    const endState = commentsReducer(
      startState,
      commentsActions.fetchAuthors.fulfilled(
        {
          authors: newState,
        },
        'requestId',
        undefined
      )
    );

    expect(endState.comments.length).toBe(0);
    expect(endState.authors.length).toBe(3);
    expect(endState.authors[1].name).toBe('Yoda');
    expect(endState.authors[2].id).toBe(3);
  });
});

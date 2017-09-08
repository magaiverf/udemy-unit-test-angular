import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  let component: VoteComponent;
  beforeEach(() => {
    component = new VoteComponent();
  })

  it('should increment totalVotes when upVoted', () => {
    component.upVote();

    expect(component.totalVotes).toBe(1);
  });
  
  it('should decrement totalVotes when downVoted', () => {
    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });  
});
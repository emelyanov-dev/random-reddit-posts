import React from "react";
import './TagsGroup.scss'
import Button from "../Button";

class TagsGroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      position: 0,
      order: 1,
    };

    this.getRowRef = this.getRowRef.bind(this);
    this.getButtonRef = this.getButtonRef.bind(this);
    this.animateButton = this.animateButton.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    setInterval(this.animateButton.bind(this), 20)
  }

  animateButton() {
    const {position, order, isStopped} = this.state;

    if (position === this.row.getBoundingClientRect().width - 120) {
      this.setState({order: 0})
    }

    if (position === 0) {
      this.setState({order: 1})
    }


    if (!isStopped) {
      this.button.style.left = `${position}px`;
      this.setState({position: order === 1 ? position + 1 : position - 1})
    }
  }


  handleMouseDown() {
    this.setState({isStopped: true})
  }

  handleMouseUp() {
    this.setState({isStopped: false})
  }

  getRowRef(ref) {
    this.row = ref;
  }

  getButtonRef(ref) {
    this.button = ref;
  }

  render() {
    const {tag, onSelect} = this.props;

    return (
      <div className="tags-group__row" ref={this.getRowRef}>
        <div className="tags-group__tag" ref={this.getButtonRef}>
          <Button theme='purple'
                  onClick={() => onSelect(tag)}
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  style={{width: '120px'}}
          >
            {tag}
          </Button>
        </div>
      </div>
    )
  }
}

function TagsGroup(props) {
  const {tags, onSelect} = props;

  return (
    <nav className="tags-group">
      {
        tags.map((tag, i) => <TagsGroupRow tag={tag} key={i} onSelect={onSelect}/>)
      }
    </nav>
  )
}

export default TagsGroup
import React, { Component } from "react";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
		hightlight: false,
		overView : true,
		urlImage : "",
	};
    this.fileInputRef = React.createRef();
    this.imageInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
	  
	  var reader = new FileReader();
		reader.onload = function() {
			alert('Contenu du fichier "' + files[0].name + '":\n\n' + reader.result);
			let url = this.result;
			this.setState({
				overView : false,
				urlImage : url,
			});
		};
		reader.readAsDataURL(files[0]);
    }
  }

  onDragOver(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave(event) {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        {this.state.overView ?(<img 
          alt="upload"
          className="Icon"
          src="./public/baseline-cloud_upload-24px.svg"
        />):(<img  src="./photos/hdhksjfdbdnjn.jpg"/>)}
        <span>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;

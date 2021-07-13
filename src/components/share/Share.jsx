import "./share.css";


export default function Share() {
 

  return (
    <div class="container">
								<div class="central-meta postbox">
									<span class="create-post">Create post</span>
									<div class="new-postbox">
										<figure>
											<img src="images/resources/admin.jpg" alt=""/>
										</figure>
										<div class="newpst-input">
											<form method="post">
												<textarea rows="2" placeholder="Share some what you are thinking?"></textarea>
											</form>
										</div>
										<div class="attachments">
											<ul>
												<li>
													<span class="add-loc">
														<i class="fa fa-map-marker"></i>
													</span>
												</li>
												<li>
													<i class="fa fa-music"></i>
													<label class="fileContainer">
														<input type="file"/>
													</label>
												</li>
												<li>
													<i class="fa fa-image"></i>
													<label class="fileContainer">
														<input type="file"/>
													</label>
												</li>
												<li>
													<i class="fa fa-video-camera"></i>
													<label class="fileContainer">
														<input type="file"/>
													</label>
												</li>
												<li>
													<i class="fa fa-camera"></i>
													<label class="fileContainer">
														<input type="file"/>
													</label>
												</li>
												<li class="preview-btn">
													<button class="post-btn-preview" type="submit" data-ripple="">Preview</button>
												</li>
											</ul>
											<button class="post-btn" type="submit" data-ripple="">Post</button>
										</div>
										<div class="add-location-post">
											<span>Drag map point to selected area</span>
											<div class="row">

											    <div class="col-lg-6">
											      	<label class="control-label">Lat :</label>
											      	<input type="text" class="" id="us3-lat" />
											    </div>
											    <div class="col-lg-6">
											      	<label>Long :</label>
											      	<input type="text" class="" id="us3-lon" />
											    </div>
											</div>
										  	<div id="us3"></div>
										</div>
									</div>	
								</div>
                </div>
  );
}

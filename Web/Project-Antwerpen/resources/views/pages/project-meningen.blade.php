@extends('layout')

@section('title')
  Meningen
@stop
@extends('navigation-layout')
@section('scripts')
	<link rel="stylesheet" href="/css/donut-graph.css">
@stop
@section('content')
<div class="projectdiv">
<h1 id="meningvraag"></h1>

<div class="wrapper">
	<div class="chart-wrapper">
	  	<button onclick='prev();replay();' class="prevbutton" type="button" name="button"><img src="/img/previous.png" alt="" /><span class="hidebutton">Vorige</span></button>
		<button onclick='next();replay();' class="nextbutton" type="button" name="button" href="questions_json"><span class="hidebutton">Volgende</span><img src="/img/next.png" alt="" /></button>
		<input type="button" id="Graphdata" name="Graphdata" value="{{json_encode($questions)}}">
	</div>
</div>
<h1 id="noAnswers" class="hide">Nog geen meningen op deze vraag</h1>
<h1 id="NoOpninion" class="hide">Er zijn nog geen meningvragen voor dit project</h1>
@if ($user && $user->isAdmin)
	<a href="/nieuwemeningvraag" class="btn btn-success meningbutton">Meningvraag toevoegen</a>
  	<a href="/verwijdermeningvraag" class="btn btn-danger meningbutton">Meningvraag verwijderen</a>
@endif
<hr>
	<div class="col-md-10 col-md-offset-1">
		<h1 id="applicationtitle">Deze meningen werden verzameld met onze applicatie: <br>
		"De slimste mens van Antwerpen".</h1>
		<div id="downloadbox">
			<h3>Download hier voor android of ios</h3>
			<img src="/img/iphone-app-icon.png" class="downloadlogo">
			<img src="/img/android-app-icon.png" class="downloadlogo">
		</div>
	</div>
</div>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="/js/donutgraph.js" ></script>
<script type="text/javascript">
	var d = document.getElementById("meningen");
	d.className += " active";
</script>
@stop

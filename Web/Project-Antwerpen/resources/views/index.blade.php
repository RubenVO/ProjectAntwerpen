@extends('layout')

@section('title')
  Overzicht
@stop
@section('content')
  <div class="container allTiles">
      <div class="sortnav">
        @if(Session::has('register'))
        <div class="alert alert-success indexflashmessage">
            <p>{{ Session::get('register')}}</p>
        </div>
        @endif
        @if(Session::has('login'))
        <div class="alert alert-success indexflashmessage">
            <p>{{ Session::get('login')}}</p>
        </div>
        @endif
        @if(Session::has('logout'))
        <div class="alert alert-success indexflashmessage">
            <p>{{ Session::get('logout')}}</p>
        </div>
        @endif
        @if(Session::has('projectcreated'))
        <div class="alert alert-success indexflashmessage">
            <p>{{ Session::get('projectcreated')}}</p>
        </div>
        @endif

         @if(Session::has('projectedited'))
        <div class="alert alert-success indexflashmessage">
            <p>{{ Session::get('projectedited')}}</p>
        </div>
        @endif
        @if(Session::has('projectdeleted'))
        <div class="alert alert-success indexflashmessage">
            <p>{{ Session::get('projectdeleted')}}</p>
        </div>
        @endif
        <div class="col-md-12">
          <fieldset>
            <div class="switch-toggle switch-candy-blue   switch-candy">
              <input id="Datum" name="view" type="radio" checked>
              <label for="Datum" onclick="" id="sort1">Datum</label>

              <input id="thema" name="view" type="radio">
              <label for="thema" onclick="" id="sort">Thema</label>
              <a></a>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="sortwrapper">
          @foreach( $projects as $project)
          <div class="col-sm-4 sort "  data-theme="{{$project->thema}}" data-date="{{$project->start_date}}" style="position:relative;">
              <div class="col-sm-12 thumbnail text-center expand wrapper">
                  <img alt="" class="img-responsive" src=
                  {{$project->headerimage}}>
                  <a class="captionlink" href="project/{{$project->id}}/tijdlijn">
                    <div class="caption {{$project->color}}" >
                      <span class="fa {{$project->thema}} fa-2x banner"></span>
                        <h4>{{$project->project_name}}</h4>

                        @if ($user && $user->isAdmin)
                          <a class="EditTile" href="bewerkproject/{{$project->id}}"> <span class="fa fa-btn fa-pencil editicon"></span>  Bewerken</a>
                            <a class="CopyTile" href="kopiërenproject/{{$project->id}}"> <span class="fa fa-btn fa-copy editicon"></span>  Kopiëren</a>
                          <a class="deleteTile" href="verwijderproject/{{$project->id}}">Verwijderen <span class="fa fa-btn fa-close"></span> </a>
                        @endif
                    </div>
                  </a>
              </div>
          </div>
          @endforeach
          @if ($user && $user->isAdmin)
          <div class="col-sm-4 sort"  data-theme="fa-zzzzz" data-date="9999-99-99">
              <div class="col-sm-12 thumbnail text-center expand">
                  <img alt="" class="img-responsive" src="/img/grey_test.jpg">
                  <a class="captionlink" href="{{ url('/nieuwproject') }}">
                    <div class="caption" >
                        <h4>Voeg een project toe</h4>
                    </div>
                  </a>
              </div>
          </div>
          @endif
      </div>
    </div>
    <script src="/js/sort.js"></script>
@stop

@extends('layout')

@section('title')
  Welkom
@stop


@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Welkom</div>

                <div class="panel-body">
                    Welkom op de site! Ga naar het <a href="/overview">overview van alle projecten</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
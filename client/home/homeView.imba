tag homeView
  prop state
  def render
    <self>
      <div> 'viewHome'  + state['msg']
      <button :tap='mudar'> 'mudar'
      <p> Date.new.getTime

  def mudar
    debugger
    state['msg'] = 'mudou'

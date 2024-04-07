package com.example.demo.Estados.EstadoDTO;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class EstadosDTO {
    private Long id;
    private Long UserId;
    private String nickname;
    private Date fechaCreacion;
    private String user_profile_picture;

    private List<String> contenidos_url;
    private int cantidadReacciones;
    private boolean isReport;

    public EstadosDTO() {
    }

    public EstadosDTO(Long id, String nickname, Date fechaCreacion, String user_profile_picture, int cantidadReacciones, boolean isReport,
                      Long UserId, List<String> contenidos_url) {
        this.id = id;
        this.nickname = nickname;
        this.fechaCreacion = fechaCreacion;
        this.user_profile_picture = user_profile_picture;
        this.cantidadReacciones = cantidadReacciones;
        this.isReport = isReport;
        this.UserId = UserId;
        this.contenidos_url = contenidos_url;
    }

    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }


    public String getUser_profile_picture() {
        return user_profile_picture;
    }

    public void setUser_profile_picture(String user_profile_picture) {
        this.user_profile_picture = user_profile_picture;
    }

    public boolean isReport() {
        return isReport;
    }

    public void setReport(boolean report) {
        isReport = report;
    }

    public int getCantidadReacciones() {
        return cantidadReacciones;
    }

    public void setCantidadReacciones(int cantidadReacciones) {
        this.cantidadReacciones = cantidadReacciones;
    }

    public boolean getIsReport() {
        return isReport;
    }

    public void setIsReport(boolean isReport) {
        this.isReport = isReport;
    }

    public List<String> getContenidos_url() {
        return contenidos_url;
    }

    public void setContenidos_url(List<String> contenidos_url) {
        this.contenidos_url = contenidos_url;
    }

}

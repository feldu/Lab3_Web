package lab3.model;

import java.util.List;

public interface PointDao {
    void save(Point point);

    List<Point> getAll();
}
